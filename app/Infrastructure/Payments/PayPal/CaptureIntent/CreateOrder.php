<?php

namespace App\Infrastructure\Payments\PayPal\CaptureIntent;

//1. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
use App\Infrastructure\Payments\PayPal\Client\PayPalClient;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;

class CreateOrder
{

    // 2. Set up your server to receive a call from the client
    /**
     *This is the sample function to create an order. It uses the
     *JSON body returned by buildRequestBody() to create an order.
     */
    public static function createOrder($return_url, $cancel_url, $amount)
    {
        $request = new OrdersCreateRequest();
        $request->prefer('return=representation');
        $request->body = self::buildRequestBody($return_url, $cancel_url, $amount);
        // 3. Call PayPal to set up a transaction
        $client = PayPalClient::client();
        $response = $client->execute($request);
        // if ($debug) {
        //   print "Status Code: {$response->statusCode}\n";
        //   print "Status: {$response->result->status}\n";
        //   print "Order ID: {$response->result->id}\n";
        //   print "Intent: {$response->result->intent}\n";
        //   print "Links:\n";
        //   foreach($response->result->links as $link)
        //   {
        //     print "\t{$link->rel}: {$link->href}\tCall Type: {$link->method}\n";
        //   }

        // }

        // 4. Return a successful response to the client.
        return $response;
    }

    /**
     * @param string $url
     * 
     * @return string
     */
    private static function addProtocol($url)
    {
        return str_starts_with($url, '//') ? "http:" . $url : $url;
    }

    /**
     * Setting up the JSON request body for creating the order with minimum request body. The intent in the
     * request body should be "AUTHORIZE" for authorize intent flow.
     *
     */
    private static function buildRequestBody($return_url, $cancel_url, $amount)
    {
        return [
            'intent' => 'CAPTURE',
            'application_context' => [
                'return_url' => self::addProtocol($return_url),
                'cancel_url' => self::addProtocol($cancel_url),
            ],
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => $amount
                    ]
                ]
            ]
        ];
    }
}
