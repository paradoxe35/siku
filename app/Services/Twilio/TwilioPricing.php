<?php

namespace App\Services\Twilio;

/**
 * [Description TwilioPricing]
 */
class TwilioPricing
{

    /**
     * @var string
     */
    public string $filename = 'services/twilio_sms_prices.csv';

    /**
     * @var string
     */
    public string $file = 'twilio_sms_prices.csv';

    /**
     * @var string
     */
    public string $key = 'SMS';


    /**
     * @var string
     */
    public string $priceKey = 'Price / msg';

    /**
     * @var string
     */
    public string $countryKey = 'Country';

    /**
     * @var string
     */
    public string $descriptionKey = 'Description';


    /**
     * @var string
     */
    public string $filterByKey = 'ISO';


    /**
     * @return mixed
     */
    public function prices($path = null)
    {
        $csvFile = $path ?: $this->getPath();
        return $this->readCSV($csvFile);
    }

    /**
     * @param string|null $code
     * @return array|null
     */
    public function parseSmsPrice($code)
    {
        return collect($this->prices())
            ->firstWhere($this->filterByKey, $code) ?: null;
    }

    /**
     * @return string
     */
    public function getPath()
    {
        return storage_path($this->filename);
    }

    /**
     * @param string $filename
     * @return array
     */
    public function readCSV($csvFile)
    {
        $csv = array_map('str_getcsv', file($csvFile));
        array_walk($csv, function (&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv);

        return $csv;
    }
}
