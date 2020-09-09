<?php

namespace App\Files\Images;

class ImageCompression
{
    public function compress_image($source_url, $destination_url = null, $quality = 50, $widths = 1080)
    {
        if (is_null($destination_url)) {
            $destination_url = $source_url;
        }
        $info = getimagesize($source_url);
        switch ($info['mime']) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/jpg':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/gif':
                $image = imagecreatefromgif($source_url);
                break;
            case 'image/png':
                $image = imagecreatefrompng($source_url);
                break;
            case 'image/JPG':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/JPEG':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/GIF':
                $image = imagecreatefromgif($source_url);
                break;
            case 'image/PNG':
                $image = imagecreatefrompng($source_url);
                break;
            default:
                break;
        }
        if (!isset($image) || !$image) {
            return $source_url;
        }
        $width = explode('"', $info[3]);
        $width = intval($width[1]);
        if (!is_null($widths) && $width > $widths) {
            $width = $widths;
        }
        $imageH = $this->createTheImage($source_url, $image, $width);
        imagejpeg($imageH, $destination_url, $quality);
        return $destination_url;
    }


    /**
     * [createTheImage description]
     * @param  [type] $file_temp_name [description]
     * @param  [type] $srce           [description]
     * @return [type]                 [description]
     */
    public function createTheImage($file_temp_name, $srce, $newwidth_min = 800)
    {
        list($width_min, $height_min) = getimagesize($file_temp_name);
        $newheight_min = ($height_min / $width_min) * $newwidth_min;
        $tmp_min = imagecreatetruecolor($newwidth_min, $newheight_min);
        imagecopyresampled($tmp_min, $srce, 0, 0, 0, 0, $newwidth_min, $newheight_min, $width_min, $height_min);
        return $tmp_min;
    }

    /**
     * Undocumented function
     *
     * @param \Illuminate\Http\UploadedFile|\Illuminate\Http\UploadedFile $file
     * @param string $path
     * @return void
     */
    public function imgToSmall($file, $path, $id, $quality = 50, $widths = 300)
    {
        $this->compress_image($file->getPathname(), null, $quality, $widths);
        $file->storeAs($path, "image_250x_{$id}." . $file->extension(), ['disk' => 'public']);
    }
}
