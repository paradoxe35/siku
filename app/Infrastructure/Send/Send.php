<?php

namespace App\Infrastructure\Send;

use App\Models\Event\Event;
use App\Models\Event\Guest;
use App\Models\Event\SendHistorical;
use App\Models\Event\Validator;

/**
 * [Description Send]
 */
class Send
{

    /**
     * @param Guest $guest
     * @param SendHistorical $historical
     */
    protected function sms(Guest $guest, SendHistorical $historical)
    {
        $filled = $historical->fill([
            'sended_sms' => true
        ]);
        $filled->save();
    }


    /**
     * @param Guest $guest
     * @param SendHistorical $historical
     */
    protected function whatsapp(Guest $guest, SendHistorical $historical)
    {
        $filled = $historical->fill([
            'sended_whatsapp' => true
        ]);

        $filled->save();
    }


    /**
     * @param Guest $item
     */
    public function proceed(Guest $item)
    {
        /**
         * @var \Illuminate\Database\Eloquent\Model
         */
        $model = $item->historical;
        if (!$model) {
            $model = $item->historical()->create([
                'user_id' => $item->user_id,
                'event_id' => $item->event_id
            ]);
        }

        if ($item->can_send_sms) {
            $this->sms($item, $model);
        }

        if ($item->can_send_whatsapp) {
            $this->whatsapp($item, $model);
        }

        $item->refresh();

        return $item;
    }

    /**
     * @param Validator $item
     */
    public function proceedValidator(Validator $item)
    {

    }

    protected function makeAhistorical()
    {
    }


    protected function saveConsumed()
    {
    }
}
