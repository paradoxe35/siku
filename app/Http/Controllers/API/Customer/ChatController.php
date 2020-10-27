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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ChatController extends Controller
{
    use CacheAutorizedUser;

    /**
     * @return \Illuminate\Http\Response
     */
    public function agent()
    {
        $appname = config('app.name', 'SiKu');

        $default = [
            'name' => "$appname Agent",
            'imageUrl' => "/img/default-agent-img.jpg",
            'role' => 'Agent',
            'status' => 'En ligne',
            'id' => time()
        ];

        $all = Agent::all();

        if ($all->count() > 0) {
            return new AgentResource($all->random(1));
        }

        return $default;
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
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'text' => ['required'],
            'chat_option' => ['required'],
            'time' => ['required']
        ]);

        $user = $request->user();

        $chat = new ChatCustomer(strval($user->id), $request->chat_option);

        if (!$chat->getDatas($user->id)) {

            $this->notifyPriority($user, $request->text, $request->chat_option);
        } else {

            $this->toTelegram($request->text, $user);
        }

        $message = [
            'time' => now()->toDateTimeLocalString(),
            'message' => $request->text,
            'user_id' => $user->id
        ];

        $chat->setMessage($message);

        return $message;
    }

    /**
     * @param string $message
     * @param \App\User $message
     * @return void
     */
    public function toTelegram($message, $user)
    {
        $ref = TelegramRefRepository::getByUserId($user->id);

        if ($ref && $this->getAutorizedChatId($ref->chat_id)) {

            Notification::route('telegram', $ref->chat_id)
                ->notify(new NotifyAdmin($message, $user));
        } else {

            $this->pendingMessage($message, $user);
        }
    }

    /**
     * @param string $message
     * @param \App\User $message
     * @return void
     */
    private function pendingMessage($message, $user)
    {
        $pending = new PendingChatMessage($user->id);

        $pending->put($message, now()->toDateTimeLocalString());
    }
}
