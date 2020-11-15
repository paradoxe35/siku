<?php

namespace App\Notifications\Payment;

use App\Infrastructure\BasePrice;
use App\Models\Payments\PaymentMeta;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use NotificationChannels\Telegram\TelegramMessage;
use NotificationChannels\Telegram\TelegramChannel;
use Spatie\Emoji\Emoji;

class UserPay extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var User
     */
    private User $user;

    /**
     * @var PaymentMeta
     */
    private PaymentMeta $payMeta;

    /**
     * @var string
     */
    private $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, PaymentMeta $payMeta)
    {
        $this->user = $user;
        $this->payMeta = $payMeta;
        $this->message = null;
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
     * @param mixed $notifiable
     * 
     * @return TelegramMessage 
     */
    public function toTelegram($notifiable)
    {
        return TelegramMessage::create()
            ->content($this->contentMessage());
    }

    /**
     * @return string
     */
    private function contentMessage()
    {
        if ($this->message) {
            return $this->message;
        }

        $user = $this->user;
        $symbol = BasePrice::$symbol;

        $pay = $this->payMeta;

        $revenue = (BasePrice::getTotalAmount() * $pay->guests);

        $content = "Completed Order " . Emoji::CHARACTER_MONEY_BAG . Emoji::CHARACTER_CHECK_MARK_BUTTON . "\n";
        $content .= "Customer name: {$user->name} \n";
        $content .= "Email: {$user->email} \n";
        $content .= "ID: {$user->hashId()} \n";
        $content .= ($user->locale ? "Locale: {$user->locale} \n" : '');
        $content .= "Amount: {$symbol}{$pay->amount}\n";
        $content .= "Invités: {$pay->guests} \n";
        $content .= "Method: {$pay->service} \n";
        $content .= "Revenue: {$symbol}" . round($revenue, 2) . PHP_EOL;

        $this->message = $content;

        return $content;
    }


    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
