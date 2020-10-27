<?php

namespace App\Infrastructure\Vars;

class TelegramApp
{
    /**
     * @return string
     */
    public static function getAppGroupChatId()
    {
        return config('telegram.app_group_chat_id');
    }

    /**
     * @return string
     */
    public static function getAppAdminChatId()
    {
        return config('telegram.app_admin_chat_id');
    }
}
