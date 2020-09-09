<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Template as ResourcesTemplate;
use App\Http\Resources\TemplateCollection;
use App\Models\Event\Event;
use App\Models\Template\Template;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EventTemplatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Event $event)
    {

        return new TemplateCollection($event->templates);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $event)
    {
        // get auth event 
        $user = $request->user();

        $request->validate([
            'name' => [
                'required', 'string', 'max:255',
                Rule::unique('templates', 'name')->where(function ($query) use ($user, $event) {
                    return $query
                        ->where('user_id', $user->id)
                        ->where('event_id', $event->id);
                })
            ],
            'sms_total' => ['required', 'numeric', 'min:1'],
            'per_sms' => ['required', 'numeric', 'min:1'],
            'text_sms' => ['required', 'string'],
            'text_whatsapp' => ['required', 'string']
        ]);

        abort_if($event->templates->count() >= 5, 400, trans('Vous pouvez pas enregistrer plus 4 modèles'));

        // store event tamplate
        $template = $event->templates()->create([
            'name' => $request->name,
            'user_id' => $user->id,
            'sms_total' => $request->sms_total,
            'per_sms' => $request->per_sms,
            'text_sms' => $request->text_sms,
            'text_whatsapp' => $request->text_whatsapp
        ]);

        return new ResourcesTemplate($template);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event\Event  $event
     * @param  \App\Models\Template\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event, Template $template)
    {
        $template->delete();
        return new ResourcesTemplate($template);
    }
}
