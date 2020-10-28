<?php

namespace App\Webhooks\Telegram\Commands\Check;

use App\Repositories\TelegramRefRepository;
use App\User;
use Illuminate\Support\Facades\Hash;

class CheckCommand extends Check
{
    /**
     * @var string Command Name
     */
    protected $name = "check";

    /**
     * @inheritdoc
     */
    public function handle()
    {

        parent::handle();

        $chatId = $this->chatId();

        $email = $this->getParamCmd('email');
        $password = $this->getParamCmd('password');

        if (is_null($email) || empty($email) || is_null($password) || empty($password)) {
            return $this->replyWithMessage(['text' => $this->warningText("Invlid Inputs, enter /help command(details)")]);
        }

        $user = User::query()
            ->Where('email', $email)
            ->where('admin_token', '!=', null)
            ->where('is_admin', true)
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return $this->replyWithMessage(['text' => $this->warningText("The provided credentials are incorrect.")]);
        }

        TelegramRefRepository::deleteByChatId($chatId);

        $this->putAutorizedChatId($chatId, ['chat_id' => $chatId, 'user_id' => $user->id]);
        // Reply with the commands list
        $this->replyWithSticker(['sticker' => "CAACAgIAAxkBAAPLX5abT-R0bXj7CR1qUxc_UdEw-yEAAhwAA5afjA6Z1Gm-YvJ55RsE"]);

        $this->replyWithMessage(['text' => "Your credentials have been validated and approved, you can now continue with other orders like (/client_chat)"]);
    }
}
