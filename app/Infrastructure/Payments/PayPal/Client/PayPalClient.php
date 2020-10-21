<?php

namespace App\Infrastructure\Payments\PayPal\Client;

use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;

// ini_set('error_reporting', E_ALL); // or error_reporting(E_ALL);
// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');

class PayPalClient
{
    /**
     * Returns PayPal HTTP client instance with environment that has access
     * credentials context. Use this instance to invoke PayPal APIs, provided the
     * credentials have access.
     */
    public static function client()
    {
        return new PayPalHttpClient(self::environment());
    }

    /**
     * Set up and return PayPal PHP SDK environment with PayPal access credentials.
     * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
     */
    public static function environment()
    {
        $clientId = getenv("PAYPAL_CLIENT_ID") ?: "AQX_Lmvi9wRcFzBQGVj8xxN5znPZHVgMVYcbe5yQZ3Bm2tXQZ2PJB30vIfWQ1KPuc3c8s20jnklvCYs0";
        $clientSecret = getenv("PAYPAL_CLIENT_SECRET") ?: "EB4i_00I4udgTIN6ynNQryYScmAzEswdZQEzF8hu456Lb39DHDmG1bzFh6IFY3_OllCoY-KEtzNCbu4Z";
        return new SandboxEnvironment($clientId, $clientSecret);
    }
}