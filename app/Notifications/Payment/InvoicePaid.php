<?php

namespace App\Notifications\Payment;

use App\Infrastructure\BasePrice;
use App\Models\Payments\PaymentMeta;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class InvoicePaid extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var PaymentMeta
     */
    public $payMeta;


    /**
     * @var string
     */
    public $symbol;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PaymentMeta $payMeta)
    {
        $this->payMeta = $payMeta->load('balance');
        $this->symbol = BasePrice::$symbol;
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
        return (new MailMessage)
            ->subject(Lang::get('Transaction invoice'))
            ->markdown('mail.invoice.paid', [
                'payMeta' => $this->payMeta,
                'symbol' => $this->symbol,
                'user' => $this->payMeta->balance->user
            ]);
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
