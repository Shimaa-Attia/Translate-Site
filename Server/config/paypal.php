<?php
/**
 * PayPal Setting & API Credentials
 * Created by Raza Mehdi <srmk@outlook.com>.
 */

return [
    'mode'    => env('PAYPAL_MODE', 'sandbox'), // Can only be 'sandbox' Or 'live'. If empty or invalid, 'live' will be used.
    'sandbox' => [
        'username'     => env('PAYPAL_SANDBOX_API_USERNAME', ''),
        'password'     => env('PAYPAL_SANDBOX_API_PASSWORD', ''),
        'secret'       => env('PAYPAL_SANDBOX_api_SECRET', ''),
        'certificate'  => env('AYPAL_SANDBOX_API_CERTIFICATE', ''),
        'app_id'       => 'APP-80W284485P519543T',
    ],
    'live' => [
        'username'     => env('PAYPAL_LIVE_API_USERNAME', ''),
        'password'     => env('PAYPAL_LIVE_API_PASSWORD', ''),
        'secret'       => env('PAYPAL_LIVE_api_SECRET', ''),
        'certificate'  => env('AYPAL_LIVE_API_CERTIFICATE', ''),
        'app_id'       => '', //used for adaptive payments API //env('PAYPAL_LIVE_APP_ID', ''),
    ],

    'payment_action' => 'Sale', //env('PAYPAL_PAYMENT_ACTION', 'Sale'), // Can only be 'Sale', 'Authorization' or 'Order'
    'currency'       => env('PAYPAL_CURRENCY', 'USD'),
    'billing_type'   =>'MerchantInitiatedBilling',
    'notify_url'     => '', //env('PAYPAL_NOTIFY_URL', ''), // Change this accordingly for your application.
    'locale'         => '', //env('PAYPAL_LOCALE', 'en_US'), // force gateway language  i.e. it_IT, es_ES, en_US ... (for express checkout only)
    'validate_ssl'   => true,//env('PAYPAL_VALIDATE_SSL', true), // Validate SSL when creating api client.
];
