@component('mail::message')

# @lang('Hello') {{ $user->name }},
### @lang('Votre transaction a bien été effectuée')


@component('mail::table')
| {{ __('ID de la facture') }} | Date | {{ __('Méthode') }} | {{ __('Montant') }} | {{ __('Code de devise') }} |
| ------------- |:-------------:|:------------------:|:-------:| --------------:|
| {{$payMeta->balance->hashId()}} | {{ $payMeta->created_at->format('Y-m-d H:i') }} | {{ $payMeta->service }} | {{ $symbol.$payMeta->amount }} | {{ $payMeta->currency_code }} |

@endcomponent

@lang('Regards'),<br>
{{ config('app.name') }}
@endcomponent