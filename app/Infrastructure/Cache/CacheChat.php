<?php

namespace App\Infrastructure\Cache;

trait CacheChat
{
    use CacheApp;

    /**
     * @var string
     */
    private $redisKeyCache = 'payment:chat:';

    /**
     * @var string
     */
    public $keyChatOption = 'chat_option';

    /**
     * @var string
     */
    public $keyChatAdminId = 'chat_admin_id';

    /**
     * @var string
     */
    public $keyChatUserId = 'chat_user_id';

    /**
     * @var string
     */
    public $keyChatMessages = 'chat_messages_datas';

    /**
     * @param int $eventId
     * 
     * @return mixed
     */
    protected function getPaymentChat($userId)
    {
        return $this->cache()->get($this->redisKeyCache . $userId);
    }

    /**
     * @param int $userId
     * 
     * @return void
     */
    protected function putPaymentChat($userId, $value = [])
    {
        $this->cache()->put($this->redisKeyCache . $userId, $value, now()->addHours(2));
    }

    /**
     * @param int $userId
     * 
     * @return void
     */
    public function deletePaymentChat($userId)
    {
        $this->cache()->delete($this->redisKeyCache . $userId);
    }
}
