<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    public function auth()
    {
        $user = factory(User::class)->make();
        Passport::actingAs(
            $user,
            ['create-servers']
        );
        $this->assertAuthenticated('api');
    }
    /**
     *  A basic test example.
     *  @return void
     */
    public function testEventRetrieve()
    {
        $this->auth();
        $response = $this->getJson('api/events');

        $response->dump();
    }
}
