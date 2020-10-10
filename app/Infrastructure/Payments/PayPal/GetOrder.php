<?php

namespace App\Infrastructure\Payments\PayPal;

use PayPalCheckoutSdk\Orders\OrdersGetRequest;
use App\Infrastructure\Payments\PayPal\Client\PayPalClient;

class GetOrder
{

  // 2. Set up your server to receive a call from the client
  /**
   *You can use this function to retrieve an order by passing order ID as an argument.
   */
  public static function getOrder($orderId, $guests, $callback = null)
  {

    // 3. Call PayPal to get the transaction details
    $client = PayPalClient::client();
    $response = $client->execute(new OrdersGetRequest($orderId));
    /**
     *Enable the following line to print complete response as JSON.
     */
    //print json_encode($response->result);
    // print "Status Code: {$response->statusCode}\n";
    // print "Status: {$response->result->status}\n";
    // print "Order ID: {$response->result->id}\n";
    // print "Intent: {$response->result->intent}\n";
    // print "Links:\n";
    // foreach($response->result->links as $link)
    // {
    //   print "\t{$link->rel}: {$link->href}\tCall Type: {$link->method}\n";
    // }
    if ($callback) $callback($response->result);
    // 4. Save the transaction in your database. Implement logic to save transaction to your database for future reference.
    // print "Gross Amount: {$response->result->purchase_units[0]->amount->currency_code} {$response->result->purchase_units[0]->amount->value}\n";
    return $response;
  }
}
