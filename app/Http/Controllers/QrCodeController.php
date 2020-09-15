<?php

namespace App\Http\Controllers;

use App\Models\Event\Event;
use Illuminate\Http\Request;

class QrCodeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke($event, $code)
    {
        $model = Event::findByHashid($event);

        if (!$model) {
            redirect('/');
            exit;
        }

        return view('qrcode.index', [
            'event' => $model,
            'code' => $code
        ]);
    }
}
