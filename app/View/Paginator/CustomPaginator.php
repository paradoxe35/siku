<?php

namespace App\View\Paginator;

use Illuminate\Pagination\LengthAwarePaginator;
use \Illuminate\Support\Collection;

class CustomPaginator
{

    /**
     * @param Collection $values
     * @param int $perPage
     * 
     * @return LengthAwarePaginator
     */
    public function paginate(Collection $values, $perPage = 12)
    {
        $page = intval(request('page', 1));
        $offset = ($page * $perPage) - $perPage;
        $datas = [];
        foreach ($values->values() as $value) {
            $datas[] = $value;
        }
        $paginate = new LengthAwarePaginator(array_slice($datas, $offset, $perPage, true), $values->count(), $perPage);
        return $paginate;
    }
}
