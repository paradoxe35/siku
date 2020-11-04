<?php

namespace App\Notifications\Telegram;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Storage;
use NotificationChannels\Telegram\TelegramChannel;
use NotificationChannels\Telegram\TelegramFile;
use NotificationChannels\Telegram\TelegramMessage;

class NotifyAdmin extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var string
     */
    private array $message;

    /**
     * @var User
     */
    private User $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(array $message, User $user)
    {
        $this->message = $message;
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [TelegramChannel::class];
    }

    /**
     * @param mixed $notifiable
     * 
     * @return TelegramFile 
     */
    public function toTelegram($notifiable)
    {
        $hasNotFile = is_null($this->message['file']);

        $send = (!$hasNotFile ? TelegramFile::create() : TelegramMessage::create())
            ->content("{$this->user->email}\n{$this->message['message']}");

        if (!$hasNotFile) {
            $send = $this->appendDocument($send);
        }

        return $send;
    }


    /**
     * @param TelegramFile $send
     * 
     * @return TelegramFile
     */
    private function appendDocument($send)
    {
        $file = $this->message['file'];

        $path = $file['path'];

        $url = null;

        $temp_pointer = tmpfile();

        if ($file['cloud']) {
            fwrite($temp_pointer, Storage::get($path));

            $url = stream_get_meta_data($temp_pointer)['uri'];
        } else {

            $url = storage_path('app/' . $path);
        }

        $send = $send->document($url, $file['name']);

        ($file['cloud'] ? Storage::delete($path) : Storage::disk('local')->delete($path));

        fclose($temp_pointer);

        return $send;
    }
}
