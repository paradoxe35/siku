<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PricingTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCountryDoesntExist()
    {
        $response = $this->get('api/country-pricing?country_code=YHS');
        $response->assertNotFound();
    }

    public function testCountryBadUrl()
    {
        $response = $this->get('api/country-pricing');
        $response->assertStatus(400);
    }

    public function testCountryTariff()
    {
        $response = $this->get('api/country-pricing?country_code=RW');
        $response->assertOk();
        $json = $response->json();
        $this->assertArrayHasKey('prices', $json);
        $this->assertArrayHasKey('sms', $json['prices']);
        $this->assertArrayHasKey('whatsapp', $json['prices']);
        return $json['prices'];
    }

    /**
     * @depends testCountryTariff
     */
    public function testPricesValueType(array $prices)
    {
        $this->assertIsFloat($prices['sms']);
    }

    public function testExchangeApiFetchUSDRateBasedOnEUR()
    {
        $response = Http::get(\App\Http\Controllers\API\PricingController::$exchangeApi);
        $this->assertEquals(200, $response->status());

        $json = (object) $response->json();

        $this->assertIsObject($json);

        $this->assertObjectHasAttribute('rates', $json);

        $this->assertObjectHasAttribute('USD', (object) $json->rates);
    }
}
