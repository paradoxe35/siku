<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Agent\Agent as AgentResource;
use App\Infrastructure\Cache\Telegram\CacheAutorizedUser;
use App\Infrastructure\Object\ChatCustomer;
use App\Infrastructure\Object\PendingChatMessage;
use App\Infrastructure\Vars\EmailApp;
use App\Infrastructure\Vars\TelegramApp;
use App\Models\Agent;
use App\Notifications\Telegram\NotifyAdmin;
use App\Notifications\Telegram\UserChatPriority;
use App\Repositories\TelegramRefRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ChatController extends Controller
{
    use CacheAutorizedUser;

    /**
     * @return \Illuminate\Http\Response
     */
    public function agent(Request $request)
    {
        $appname = config('app.name', 'SiKu');

        $default = [
            'name' => "$appname Agent",
            'image' => "/img/default-agent-img.jpg",
            'role' => 'Agent',
            'status' => 1,
            'id' => time()
        ];

        $all = Agent::all();

        if ($all->count() > 0) {
            return (new AgentResource($all[random_int(0, $all->count() - 1)]))
                ->toArray($request);
        }

        return (new AgentResource((object) $default))->toArray($request);
    }

    /**
     * @param ChatCustomer $chat
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(ChatCustomer $chat, Request $request)
    {
        $user = $request->user();

        $datas = $chat->getDatas($user->id);

        return [
            'expire' => !$datas,
            'datas' => $datas ?: []
        ];
    }


    /**
     * @param \App\User $user
     * @param string $message
     * @param string $chat_option
     * 
     * @return void
     */
    private function notifyPriority($user, $message, $chat_option)
    {
        Notification::route('telegram', TelegramApp::getAppGroupChatId())
            ->route('mail', EmailApp::getAppEmailAddress())
            ->notify(new UserChatPriority($user, $message, $chat_option));
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function priority(Request $request)
    {
        $request->validate([
            'chat_option' => ['required']
        ]);

        $user = $request->user();

        $chat = new ChatCustomer(strval($user->id), $request->chat_option);

        $this->notifyPriority($user, '', $request->chat_option);

        return $chat->initObject();
    }

    /**
     * @param Request $request
     * @param \App\User $user
     * 
     * @return [type]
     */
    public function uploadFile(Request $request, $user)
    {
        $disk = config('filesystems.default');

        if ($request->hasFile('file')) {

            $file = $request->file('file');

            $local = in_array($disk, ['public', 'local']);

            $directory = 'tmp/chat/' . $user->id;

            $upload = $file->store($directory, $local ? 'local' : []);

            return [
                'name' => $file->getClientOriginalName(),
                'mine-type' => $file->getClientMimeType(),
                'ext' => $file->getClientOriginalExtension(),
                'path' => $upload,
                'cloud' => !$local,
                'directory' => $directory
            ];
        }

        return null;
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'text' => [
                Rule::requiredIf(!$request->hasFile('file'))
            ],
            'chat_option' => ['required'],
            'time' => ['required'],
            'file' => ['nullable', 'file', 'max:5120']
        ]);

        $user = $request->user();

        $chat = new ChatCustomer(strval($user->id), $request->chat_option);

        $message = [
            'time' => now()->toDateTimeLocalString(),
            'message' => $request->text,
            'user_id' => $user->id,
        ];

        if (!$chat->getDatas($user->id)) {

            $this->notifyPriority($user, $request->text, $request->chat_option);
        } else {

            $message = $this->toTelegram($message, $request, $user);
        }

        $chat->setMessage($message);

        return $message;
    }

    /**
     * @param array $message
     * @param Request $message
     * @param User $user
     * 
     * @return array
     */
    public function toTelegram(array $message, Request $request, User $user)
    {
        $message['file'] = $this->uploadFile($request, $user);

        $ref = TelegramRefRepository::getByUserId($user->id);

        if ($ref && $this->getAutorizedChatId($ref->chat_id)) {

            Notification::route('telegram', $ref->chat_id)
                ->notify(new NotifyAdmin($message, $user));
        } else {

            $this->pendingMessage($message, $user);
        }

        return $message;
    }

    /**
     * @param array $message
     * @param User $message
     * @return void
     */
    private function pendingMessage(array $message, User $user)
    {
        $pending = new PendingChatMessage($user->id);

        $pending->put($message);
    }
}
