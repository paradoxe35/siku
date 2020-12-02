<?php

namespace App\Notifications\Telegram;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use NotificationChannels\Telegram\TelegramMessage;
use NotificationChannels\Telegram\TelegramChannel;
use Spatie\Emoji\Emoji;

class UserChatPriority extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var User
     */
    private User $user;


    /**
     * @var string
     */
    private string $message;


    /**
     * @var string
     */
    private string $chat_option;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, string $message, string $chat_option)
    {
        $this->user = $user;
        $this->message = $message;
        $this->chat_option = $chat_option;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [TelegramChannel::class, 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from($this->user->email, $this->user->name)
            ->line($this->contentMessage());
    }


    /**
     * @return string
     */
    private function contentMessage()
    {
        $user = $this->user;

        $content = "Hello there! " . Emoji::CHARACTER_SPEECH_BALLOON . "\n";
        $content .= "Customer with name: {$user->name}\n";
        $content .= "Email: {$user->email}\n";
        $content .= "ID: {$user->hashId()}\n";
        $content .= ($user->locale ? "Locale: {$user->locale}\n" : '');
        $content .= "He Would like to get contact with one of agents\n";
        $content .= "Content Of his Message:  `{$this->message}`\n";
        $content .= "Chat Option:  {$this->chat_option}\n";

        return $content;
    }

    /**
     * @param mixed $notifiable
     * 
     * @return TelegramMessage 
     */
    public function toTelegram($notifiable)
    {
        return TelegramMessage::create()
            ->content($this->contentMessage());
    }
}
