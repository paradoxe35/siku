<?php

namespace App\Mail;

use App\Infrastructure\Vars\EmailApp;
use App\Models\Event\Guest;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;
use Spatie\IcalendarGenerator\Enums\Classification;
use Spatie\IcalendarGenerator\Enums\EventStatus;

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
            ->view('mail.events.default-mail')
            ->with('content', $guest->text_mail);

        if ($guest->can_include_icalendar) {
            $data = $this->calendar($guest);

            $mail->attachData($data, 'Calendar', [
                'mime' => 'text/calendar',
                'charset' => 'utf-8',
            ]);
        }

        return $mail;
    }

    /**
     * @param Guest $guest
     * 
     * @return string
     */
    private function calendar($guest)
    {
        $event = $guest->event;
        $user = $guest->user;

        return Calendar::create($this->appName)
            ->event(
                Event::create($event->name)
                    ->description($event->desciption)
                    ->status(EventStatus::confirmed())
                    ->classification($event->is_public ? Classification::public() : Classification::private())
                    ->organizer($user->email, $user->name)
                    ->startsAt(Carbon::parse($event->start_time))
                    ->endsAt(Carbon::parse($event->end_time))
            )
            ->get();
    }
}
