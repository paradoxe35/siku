<?php

namespace App\Http\Controllers\Webhooks;

use App\Http\Controllers\Controller;
use App\Models\Webhooks\TelegramWebhook;
use App\Webhooks\Telegram\Handlers\SendChatHandler;
use Illuminate\Http\Request;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Objects\Update;

class TelegramController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, SendChatHandler $chat)
    {
        //  Telegram::getWebhookUpdates();

        $updates = Telegram::commandsHandler(true);

        $update = new Update($updates);

        $chat->hanlder($update);

        $model = TelegramWebhook::first();

        $json = json_encode($updates);

        if ($model) {
            $model->datas = $json;

            $model->save();
        } else {
            TelegramWebhook::create([
                'datas' => $json
            ]);
        }

        return $updates;
    }
}
