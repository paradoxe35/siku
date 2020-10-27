<?php

namespace App\Infrastructure\Object;

use App\Infrastructure\Cache\CachePendingMessageClient;

class PendingChatMessage
{
    use CachePendingMessageClient;

    /**
     * @var string
     */
    private $user_id;

    /**
     * @param string $userId
     */
    public function __construct($userId)
    {
        $this->user_id = $userId;
    }

    /**
     * @return array
     */
    public function get()
    {
        return $this->getPendingMessageChat($this->user_id) ?: [];
    }

    /**
     * @param string $message
     * @param string $date
     * @return array
     */
    public function put(string $message, string $date)
    {
        $messages = $this->get() ?: [];

        $count = count($messages);

        $messages = array_slice($messages, $count - 50, $count);

        array_push($messages, [
            'text' => $message,
            'date' => $date
        ]);

        $this->putPendingMessageChat($this->user_id, $messages);
    }

    /**
     * @return void
     */
    public function clear()
    {
        $this->deletePendingMessageChat($this->user_id);
    }
}
