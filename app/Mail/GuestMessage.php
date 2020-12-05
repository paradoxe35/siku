<?php

namespace App\Mail;

use App\Infrastructure\ICalendar;
use App\Infrastructure\Vars\EmailApp;
use App\Models\Event\Guest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GuestMessage extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Mail content.
     *
     * @var Guest
     */
    protected $guest;


    /**
     * app name.
     *
     * @var string
     */
    protected $appName;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Guest $guest)
    {
        $this->guest = $guest;
        $this->appName = config('app.name', 'SiKu');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $guest = $this->guest->load(['event', 'user']);
        $event = $guest->event;
        /** @var \App\User */
        $user = $guest->user;

        $email = $user->hasVerifiedEmail() ? $user->email : EmailApp::getAppEmailAddress();

        $mail = $this
            ->from($email, "{$this->appName}, {$user->name}")
            ->subject($event->name)
            ->view('mail.events.event-mail-v1')
            ->with([
                'content' => $guest->text_mail,
                'qrcode' => ($guest->can_include_qrcode ?
                    route('qrcode', ['code' => $guest->code, 'event' => $event->hashid(), 'full' => '1']) :  null),
                'user' => $user,
                'event' => $event,
                'app_url' => config('app.url'),
                'icalendar' => ICalendar::getRoute($event)
            ]);

        if ($guest->can_include_icalendar) {
            $data = ICalendar::create($event);

            $mail->attachData($data, 'Calendar', [
                'mime' => 'text/calendar',
                'charset' => 'utf-8',
            ]);
        }

        return $mail;
    }
}
