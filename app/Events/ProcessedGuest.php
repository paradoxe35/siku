<?php

namespace App\Events;

use App\Http\Resources\Guest\Guest as ResourcesGuest;
use App\Models\Event\Guest;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProcessedGuest implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Guest
     */
    private $guest;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Guest $guest)
    {
        $this->guest = $guest;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('App.User.' . $this->guest->user_id);
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'processed.guest';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'status' => $this->guest->load('event')->event->status(),
            'data' => (new ResourcesGuest($this->guest->load('historical')))->toArray(null)
        ];
    }
}
