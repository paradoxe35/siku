<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use App\Services\Twilio\TwilioPricing;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    /**
     * @var TwilioPricing
     */
    private TwilioPricing $twilio;

    /**
     * @param TwilioPricing $twilio
     */
    public function __construct(TwilioPricing $twilio)
    {
        $this->twilio = $twilio;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $iso = request('iso');

        $lastModifiedTwulio = date("F d Y H:i:s.", filemtime($this->twilio->getPath()));
        $fileSize = $this->human_filesize(filesize($this->twilio->getPath()));

        $twilioPricing = $this->twilio->prices();

        $filter = [];

        if ($iso) {
            $filter = collect($this->twilio->prices())
                ->filter(fn ($price) => $price[$this->twilio->filterByKey] === $iso)
                ->values()
                ->toArray();
        }

        $twilioFilename = $this->twilio->file;

        return view(
            'admin.price-balance.services',
            compact('lastModifiedTwulio', 'filter', 'fileSize', 'twilioFilename')
        );
    }

    /**
     * @param int $bytes
     * @param int $decimals
     * 
     * @return string
     */
    private function human_filesize($bytes, $decimals = 2)
    {
        $sz = 'BKMGTP';
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
    }


    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function twilioUpload(Request $request)
    {
        $this->authorize('super-admin');

        $request->validate([
            'filecsv' => ['required', 'file', 'mimetypes:text/plain', 'max:1024']
        ]);

        $file = $request->file('filecsv');

        abort_if($file->getClientOriginalExtension() !== "csv", 400, trans('Extension de fichier non valide'));

        $prices = $this->twilio->prices($file->getPathname());

        abort_if(!is_array($prices) || !isset($prices[0]), 400, trans('Contenu de fichier non valide'));

        $priceKeys = array_keys($prices[0]);

        $twilio = $this->twilio;

        abort_if(
            !in_array($twilio->filterByKey, $priceKeys) || !in_array($twilio->priceKey, $priceKeys),
            400,
            trans('Contenu de fichier non valide')
        );

        file_put_contents($twilio->getPath(), $file->get());

        return [
            'message' => trans('Fichier téléchargé avec succès')
        ];
    }
}
