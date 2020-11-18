<?php

namespace App\Repositories;

use App\Models\BasePrice;

class BasePriceRepository
{

    /**
     * @return array
     */
    public static function getAmount()
    {
        $first = BasePrice::query()->first();

        return $first ? [
            'sms' => $first->amount_sms,
            'mail' => $first->amount_mail
        ] : null;
    }

    /**
     * @param double $sms
     * @param double $mail
     * 
     * @return bool
     */
    public static function setAmounts($sms, $mail)
    {
        $query = BasePrice::query();

        $price = $query->first();

        $data = [
            'amount_sms' => $sms,
            'amount_mail' => $mail
        ];

        if ($price) {
            $price->fill($data)->save();
        } else {
            $query->create($data);
        }

        return true;
    }
}
