<?php

namespace App\Services\Nexmo;

use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;

/**
 * [Description NexmoPricing]
 */
class NexmoPricing
{

    /**
     * @var string
     */
    public string $filename = 'services\nexmo_sms_pricing.xlsx';

    /**
     * @var string
     */
    public string $key = 'SMS';

    /**
     */
    public function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function prices($path = null)
    {
        $file = $path ?: storage_path($this->filename);
        $datas = $this->xlsx_to_array($file);
        return $datas;
    }

    /**
     * @param string|null $code
     * @return array|null
     */
    public function parseSmsPrice($code)
    {
        return collect($this->prices())
            ->firstWhere('Country Code', $code) ?: null;
    }

    /**
     * @param string $filename
     * @return array
     */
    public static function xlsx_to_array($filename = '')
    {
        $data = [];
        $keys = [];
        $reader = ReaderEntityFactory::createXLSXReader();
        $reader->open($filename);
        foreach ($reader->getSheetIterator() as $sheet) {
            foreach ($sheet->getRowIterator() as $row) {
                if (empty($keys)) {
                    $keys = $row->toArray();
                } else {
                    $data[] = array_combine($keys, $row->toArray());
                }
            }
            break;
        }
        $reader->close();
        return $data;
    }
}
