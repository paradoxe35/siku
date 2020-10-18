<?php

namespace App\Events\Mobile;

use App\Models\Event\Attend;
use App\Http\Resources\Attend\Attend as AttendResource;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ValidatedGuest implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Attend
     */
    private Attend $attend;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Attend $attend)
    {
        $this->attend = $attend;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('App.Event.Validation.' . $this->attend->event_id);
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'validated.guest';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return (new AttendResource($this->attend->load('guest')->load('validator')))->toArray(null);
    }
}
