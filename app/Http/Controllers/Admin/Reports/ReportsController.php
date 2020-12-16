<?php

namespace App\Http\Controllers\Admin\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect(route('admin.reports.customers'));;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function customers()
    {
        return view('admin.reports.customers');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function events()
    {
        return view('admin.reports.events');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function sales()
    {
        return view('admin.reports.sales');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function twilioSmsStatus()
    {
        return view('admin.reports.twilio-sms-status');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function paypalTransactions()
    {
        return view('admin.reports.paypal-transactions');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function general()
    {
        return view('admin.reports.general');
    }
}
