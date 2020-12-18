<?php

namespace App\Http\Middleware;

use App\Files\Images\ImageCompression;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Closure;
use Illuminate\Http\Request;

class ImageOptimize
{
    private ImageCompression $optimizer;


    public function __construct(ImageCompression $optimizer)
    {
        $this->optimizer = $optimizer;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  int|null $width
     * @param  int|null $quality
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $width = null, $quality  = null)
    {

        $width = is_null($width) ? 1080 : intval($width);
        $quality = is_null($quality) ? 50 : intval($quality);

        collect($request->allFiles())
            ->flatten()
            ->filter(function (UploadedFile $file) {
                if (app()->environment('testing')) {
                    return true;
                }
                return $file->isValid();
            })
            ->each(function (UploadedFile $file) use ($quality, $width) {
                if ($this->isImage($file->getMimeType())) {

                    $this->optimizer->compress_image(
                        $file->getPathname(),
                        null,
                        $quality,
                        $width
                    );
                }
            });
        return $next($request);
    }

    /**
     * @param string|null $mineType
     * @return boolean
     */
    private function isImage(?string $mineType)
    {
        if (in_array(
            $mineType,
            ['image/jpeg', 'image/jpg', 'image/gif', 'image/png', 'image/JPEG', 'image/JPG', 'image/GIF', 'image/PNG']
        )) {
            return true;
        }
        return false;
    }
}
