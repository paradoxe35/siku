<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use Illuminate\Http\Request;

class CompanyDetailsController extends Controller
{

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return CompanyDetail::query();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return [
            'data' => $this->query()->latest()->get()
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'private_email' => ['required', 'string', 'email', 'max:255'],
            'public_email' => ['required', 'string', 'email', 'max:255'],
            'private_phone' => ['required', 'regex:/^[0-9\-\(\)\/\+\s]*$/'],
            'public_phone' => ['required', 'regex:/^[0-9\-\(\)\/\+\s]*$/'],
        ]);

        $query = $this->query();

        abort_if($query->count() > 5, 400, trans('Vous pouvez pas enregistrer plus de 5 détails'));

        $detail = $query->create([
            'public_email' => $request->public_email,
            'private_email' => $request->private_email,
            'private_phone' => $request->private_phone,
            'public_phone' => $request->public_phone,
        ]);

        return [
            'message' => trans('Enregistré'),
            'item' => $detail
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $detail = $this->query()->findOrFail($id);

        $detail->delete();

        return $detail;
    }
}
