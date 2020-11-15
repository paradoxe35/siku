<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\Template\Template as ResourcesTemplate;
use App\Http\Resources\Template\TemplateCollection;
use App\Models\Event\Event;
use App\Models\Template\Template;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Instasent\SMSCounter\SMSCounter;


class EventTemplatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Event $event, Request $request)
    {
        $gTemplate = $request->user()->templates()->where('global', true)->get();

        $templates = $event->templates()->where('global', false)->get();

        return new TemplateCollection($gTemplate->merge($templates));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $event, SMSCounter $smsCounter)
    {
        // get auth event
        /** @var \App\User */
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
            'text_mail' => ['required', 'string'],
            'global' => ['nullable']
        ]);

        $em = 'Vous pouvez pas enregistrer plus :count modèles';

        $isGlobal = !!$request->global;

        if (!!$isGlobal) {
            $globalTemplate = $user->templates()->where('global', true)->count();

            abort_if($globalTemplate >= 5, 400, trans($em . ' globals', ['count' => $globalTemplate]));
        } else {
            $privateTemplate = $event->templates()->where('global', false)->count();

            abort_if($privateTemplate >= 5, 400,  trans($em, ['count' => $privateTemplate]));
        }

        $smsParsed = $smsCounter->count($request->text_sms);

        // store event tamplate
        $template = $event->templates()->create([
            'name' => $request->name,
            'user_id' => $user->id,
            'sms_total' => $smsParsed->messages,
            'per_sms' => $request->per_sms,
            'text_sms' => $request->text_sms,
            'text_mail' => $request->text_mail,
            'global' => $isGlobal
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
