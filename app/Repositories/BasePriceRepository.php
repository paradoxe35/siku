<?php

namespace App\Repositories;

use App\Models\BasePrice;

class BasePriceRepository
{
    /**
     * @var BasePrice
     */
    private BasePrice $basePrice;

    /**
     * @param BasePrice $event
     */
    public function __construct(BasePrice $basePrice)
    {
        $this->basePrice = $basePrice;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return $this->basePrice->newQuery();
    }

    /**
     * @return int
     */
    public function getAmount()
    {
        $first = $this->query()->first();
        return $first ? $first->amount : null;
    }
}
