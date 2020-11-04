@component('mail::message')
# Invoice

Votre paiement a été approuvé avec succès.

@component('mail::table')
| {{ __('ID DE PAIEMENT') }} | DATE | {{ __('METHODE DE PAIEMENT') }} | {{ __('MONTANT') }} | {{ __('CODE DE DEVISE') }} |
| ------------- |:-------------:|:------------------:|:-------:| --------------:|
|{{$payMeta->balance->hashId()}}| {{ $payMeta->created_at->format('Y-m-d H:i') }} |{{ $payMeta->service }} |{{ $symbol.$payMeta->amount }} |{{ $payMeta->currency_code }} |

@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent