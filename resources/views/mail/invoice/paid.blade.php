@component('mail::message')
# Invoice

Votre paiement a été approuvé avec succès.

@component('mail::table')
| PAYMENT ID | DATE | METHOD OF PAYMENT | AMOUNT | CURRENCY CODE |
| ------------- |:-------------:|:------------------:|:-------:| --------------:|
|{{$payMeta->balance->hashId()}}| {{ $payMeta->created_at->format('Y-m-d H:i') }} |{{ $payMeta->service }} |{{ $symbol.$payMeta->amount }} |{{ $payMeta->currency_code }} |

@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent