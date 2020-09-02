<?php

namespace Tests\Unit\Service;

use App\Services\Nexmo\NexmoPricing;
use Tests\TestCase;

class PricingTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testNexmoSMSPricingMustBeUnArray()
    {
        $nexmo = new NexmoPricing;
        $this->assertIsArray($nexmo->prices());
    }

    public function testNexmoSMSPricingMustHaveValidKeys()
    {
        $nexmo = new NexmoPricing;
        foreach ($nexmo->prices() as $value) {
            $this->assertEquals(
                [
                    'Country Code', 'Country Name', 'Prefix', 'Price (EUR) / message', 'Valid from (UTC)'
                ],
                array_keys($value)
            );
        }
    }
}
