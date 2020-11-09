<?php

namespace App\Http\Controllers\Admin\Customers;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class CustomersController extends Controller
{

    /**
     * Admin Customers controller
     */
    public function __construct()
    {
        $this->middleware(function (Request $request, \Closure $next) {
            URL::defaults(['id' => $request->route('id')]);

            return $next($request);
        })->except('index');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return User::query()
            ->where('is_admin', false)
            ->with('AllBalance')
            ->with('consumeds')
            ->with('events');
    }

    /**
     * @param mixed $query
     * 
     * @return mixed
     */
    private function email($query, $email)
    {
        return $query->where('email', 'like', "%$email%");
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = $this->query()->latest();

        $active = request('active');

        if (request('email')) {
            $query = $this->email($query, request('email'));
        }

        if (!in_array($active, ['deleted', 'all'])) {
            # code...
        } elseif ($active === 'deleted') {
            $query = $query->onlyTrashed();
        } elseif ($active === 'all') {
            $query = $query->withTrashed();
        }

        $customers = $query->paginate();

        return view('admin.customers.home', compact('customers'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = $this->query()->findOrFail($id);

        return view('admin.customers.show', compact('customer'));
    }
}
