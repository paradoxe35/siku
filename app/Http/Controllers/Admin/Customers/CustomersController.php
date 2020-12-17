<?php

namespace App\Http\Controllers\Admin\Customers;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Customer\CustomPayment\CustomPaymentCollection;
use App\Http\Resources\Admin\Customer\Event\CustomerEventCollection;
use App\Http\Resources\Admin\Customer\Purchase\CustomerPurchaseCollection;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
    private function customerQuery()
    {
        return User::query();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return $this->customerQuery()
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

        if ($active === 'deleted') {
            $query = $query->onlyTrashed();
        } elseif ($active === 'all') {
            $query = $query->withTrashed();
        }

        $customers = $query->paginate();

        return view('admin.customers.home', compact('customers'));
    }

    /**
     * @param int $id
     * 
     * @return \App\User
     */
    private function queryWithTrashed($id)
    {
        return $this->customerQuery()->withTrashed()->findOrFail($id);
    }

    /**
     * @param \App\User $customer
     * 
     * @return void
     */
    private function customerDep($customer)
    {
        $customer->events_count = $customer->events()->count();
        $customer->events_trashed = $customer->events()->onlyTrashed()->count();

        $customer->load('lowBalance');

        $customer->balance = round($customer->balance(), 2);

        $customer->total_consumed = round($customer->totalConsumeds(), 2);

        $customer->total_purchase = round($customer->totalBalance(), 2);

        $customer->deleted = !!$customer->deleted_at;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = $this->queryWithTrashed($id);

        $this->customerDep($customer);

        return view('admin.customers.show', compact('customer'));
    }

    /**
     * @param \App\User $customer
     * @return boolean
     */
    private function abortIfIsAdmin($customer)
    {
        abort_if($customer->isAdmin(), 400, trans("L'utilisateur administrateur ne peut pas être modifié"));
    }


    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country_code' => ['required', 'string', 'max:255'],
            'country_name' => ['required', 'string', 'max:255'],
            'password' => ['nullable', 'string', 'max:255', 'min:8', 'confirmed'],
        ]);

        $customer = $this->queryWithTrashed($id);

        $this->abortIfIsAdmin($customer);

        $filled = $customer->fill([
            'name' => $request->name,
            'country_name' => $request->country_name,
            'country_code' => $request->country_code
        ]);

        if ($request->filled('password')) {
            $filled->password = Hash::make($request->password);
        }

        $filled->save();

        $customer->refresh();

        $this->customerDep($customer);

        return [
            'message' => trans('Modifications enregistrées'),
            'customer' => $customer
        ];
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function trash($id)
    {
        $customer = $this->queryWithTrashed($id);

        $this->abortIfIsAdmin($customer);

        if ($customer->trashed()) {
            $customer->restore();
        } else {
            $customer->delete();
        }

        $customer->save();

        $customer->refresh();

        $this->customerDep($customer);

        return [
            'message' => trans('Modifications enregistrées'),
            'customer' => $customer
        ];
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function events($id)
    {
        $event = $this->queryWithTrashed($id)->events()->latest();

        if (request('filter') == 'trash') {
            $event = $event->onlyTrashed();
        }

        return new CustomerEventCollection($event->paginate());
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function purchases($id)
    {
        $purchases = $this->queryWithTrashed($id)->AllBalance()->with('paymentMeta')->latest();

        if (request('filter') == 'unconfirmed') {
            $purchases = $purchases->where('confirmed', false);
        } else {
            $purchases = $purchases->where('confirmed', true);
        }

        return new CustomerPurchaseCollection($purchases->paginate());
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function customPayments($id)
    {
        $purchases = $this->queryWithTrashed($id)->customPayment()->with('balance')->latest();

        if (request('filter') == 'unauthorized') {
            $purchases = $purchases->where('active', false);
        } else {
            $purchases = $purchases->where('active', true);
        }

        return new CustomPaymentCollection($purchases->paginate());
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function lowBalance(Request $request, $id)
    {
        $user = $this->queryWithTrashed($id);

        $status = $user->lowBalance;

        return response()->json($status, $status ? 200 : 204);
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setLowBalance(Request $request, $id)
    {
        $request->validate([
            'amount' => ['required', 'min:0.01', 'numeric']
        ]);

        $user = $this->queryWithTrashed($id);

        if ($user->lowBalance) {

            $user->lowBalance->fill([
                'amount' => $request->amount
            ])->save();
        } else {

            $user->lowBalance()->create([
                'amount' => $request->amount
            ]);
        }

        $user->refresh();

        return $user->lowBalance;
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function destoryLowBalance(Request $request, $id)
    {
        $user = $this->queryWithTrashed($id);

        $user->lowBalance && $user->lowBalance->delete();

        return response()->json();
    }
}
