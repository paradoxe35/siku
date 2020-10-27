<?php

namespace App\Notifications\Telegram;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use NotificationChannels\Telegram\TelegramMessage;
use NotificationChannels\Telegram\TelegramChannel;

class NotifyAdmin extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var string
     */
    private string $message;

    /**
     * @var User
     */
    private User $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $message, User $user)
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
     * @return TelegramMessage 
     */
    public function toTelegram($notifiable)
    {
        return TelegramMessage::create()
            ->content("{$this->user->email}\n$this->message");
    }
}
