<?php

namespace App\Notifications\Payment;

use App\Infrastructure\BasePrice;
use App\Models\Payments\CustomPayment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class CustomPaymentNotify extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var CustomPayment
     */
    private $customPayment;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(CustomPayment $customPayment)
    {
        $this->customPayment = $customPayment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $pay = $this->customPayment->load('user');
        return (new MailMessage)
            ->success()
            ->subject(Lang::get('Receipt for your personalized payment'))
            ->line(Lang::get("Your :amount transaction has been finalized and approved.", [
                'amount' => BasePrice::$symbol . $pay->amount
            ]))
            ->line(Lang::get('Here is your payment code :code', [
                'code' => $pay->payment_code
            ]));
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
