<?php

namespace App\Infrastructure\Searchable;

trait FullTextSearch
{
    /**
     * Replaces spaces with full text search wildcards
     *
     * @param string $term
     * @return string
     */
    protected function fullTextWildcards($term)
    {
        // removing symbols used by MySQL
        $reservedSymbols = ['-', '+', '<', '>', '@', '(', ')', '~'];
        $term = str_replace($reservedSymbols, '', trim($term));

        $words = explode(' ', $term);

        foreach ($words as $key => $word) {
            /*
             * applying + operator (required word) only big words
             * because smaller ones are not indexed by mysql
             */
            if (strlen($word) >= 3) {
                $words[$key] = '+' . $word . '*';
            }
        }

        $searchTerm = implode(' ', $words);

        return $searchTerm;
    }

    /**
     * Scope a query that matches a full text search of term.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $term
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $term)
    {
        $columns = implode(',', $this->searchable);
        $searchableTerm = $this->fullTextWildcards($term);
        if (strlen($searchableTerm)) {
            // $query = $query->where(function ($q) use ($searchableTerm) {
            //     foreach ($this->searchable as $key => $column) {
            //         if ($key < 1) {
            //             $q = $q->where($column, 'like', "%{$searchableTerm}%");
            //         } else {
            //             $q = $q->orWhere($column, 'like', "%{$searchableTerm}%");
            //         }
            //     }
            // });
        } else {
            $query = $query->whereRaw("MATCH ({$columns}) AGAINST (? IN BOOLEAN MODE)", [$searchableTerm]);
        }
        return $query;
    }
}
