<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Settings\Admin\Admin;
use App\Http\Resources\Admin\Settings\Admin\AdminCollection;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminsController extends Controller
{

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */

    private function query()
    {
        return User::query()->where('is_admin', true);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = $this->query()->latest();

        switch (request('filter')) {
            case 'super':
                $query = $query->where('super_admin', true);
                break;
            case 'trashed':
                $query = $query->onlyTrashed();
                break;
            default:
                break;
        }

        return new AdminCollection($query->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data =  $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['required', 'regex:/^[0-9\-\(\)\/\+\s]*$/', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'country_name' => ['required', 'string'],
            'country_code' => ['required', 'string'],
            'super_admin' => ['nullable', 'string'],
        ]);

        $super = !!$request->super_admin;

        if ($super) {
            $this->authorize('super-admin');
        }

        $item = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
            'country_name' => $data['country_name'],
            'country_code' => $data['country_code'],
        ]);

        $item->is_admin = true;

        $item->super_admin = $super;

        $item->save();

        $item->refresh();

        return [
            'message' => trans("L'utilisateur a été enregistré avec succès"),
            'item' => (new Admin($item))->toArray($request)
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        $user = $request->user();

        $this->authorize('super-admin');

        abort_if($user->id == $id, 402, trans("Impossible de supprimer l'utilisateur actuellement authentifié"));

        $item = $this->query()->findOrFail($id);

        if (request('trash')) {
            if ($item->trashed()) {
                $item->restore();
            } else {
                $item->delete();
            }
        } else {

            $item->forceDelete();
        }

        return new Admin($item);
    }
}
