<?php

namespace App\Infrastructure\Object;

use App\Infrastructure\Cache\CacheChat;

class ChatCustomer
{
    use CacheChat;

    /**
     * @var array
     */
    private $info = [];

    /**
     * @param string $userId
     * @param string $chatOption
     */
    public function __construct(string $userId = null, string $chatOption = null, array $dataChat = [])
    {
        $this->info[$this->keyChatUserId] = $userId;
        $this->info[$this->keyChatOption] = $chatOption;
        $this->info[$this->keyChatMessages] = $dataChat;
    }

    /**
     * @param mixed $userId
     * 
     * @return mixed
     */
    public function getDatas($userId)
    {
        return $this->getPaymentChat($userId);
    }


    /**
     * @param mixed $userId
     * 
     * @return void
     */
    public function destroy($userId) {
        $this->deletePaymentChat($userId);
    }


    /**
     * @return string|int
     */
    public function getUserId()
    {
        return $this->info[$this->keyChatUserId];
    }

    /**
     * @return string
     */
    public function getChatOption()
    {
        return $this->info[$this->keyChatOption];
    }

    /**
     * @return array
     */
    public function getMessages()
    {
        $datas = $this->getPaymentChat($this->getUserId());

        return $datas ? $datas[$this->keyChatMessages] : $this->info[$this->keyChatMessages];
    }

    /**
     * @return array
     */
    public function getObject()
    {
        $datas = $this->getPaymentChat($this->getUserId());

        $datas = $datas ?: $this->info;

        $old = $datas[$this->keyChatOption];

        if ($old !== $this->getChatOption()) {
            $datas[$this->keyChatMessages] = [];
        }

        $datas[$this->keyChatOption] = $this->getChatOption();

        return $datas;
    }

    /**
     * @return array
     */
    public function initObject()
    {
        if (!$this->getPaymentChat($this->getUserId())) {
            $this->putPaymentChat($this->getUserId(), $this->info);
        }
        return $this->info;
    }

    /**
     * @param array $message
     * 
     * @return mixed
     */
    public function setMessage(array $message)
    {
        $datas = $this->getObject();

        $prev = $datas[$this->keyChatMessages];

        $count = count($prev);

        $new = array_slice($prev, $count - 50, $count);

        array_push($new, $message);

        $datas[$this->keyChatMessages] = $new;

        $this->putPaymentChat($this->getUserId(), $datas);

        return $datas;
    }
}
