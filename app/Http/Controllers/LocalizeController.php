<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocalizeController extends Controller
{
    /**
     * @param Request $request
     * @return array
     */
    public function changeLang(Request $request)
    {
        $locale = $request->get('locale');
        $user = $request->user();
        if ($user) {
            $user->locale = $request->get('locale');
            $user->save();
        } else {
            setcookie("locale", $locale, strtotime('+30 days'));
        }
        return compact('locale');
    }
}
