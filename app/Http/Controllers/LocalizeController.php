<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocalizeController extends Controller
{

    /**
     * @return mixed
     */
    private function auth()
    {
        return auth()->user();
    }

    /**
     * @param Request $request
     * @return array
     */
    public function changeLang(Request $request)
    {
        $locale = $request->get('locale');

        $user = $this->auth();

        if ($user) {

            $user->locale = $locale;
            $user->save();
        } else {

            setcookie("locale", $locale, strtotime('+30 days'));
        }

        return compact('locale');
    }
}
