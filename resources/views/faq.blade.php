@extends('layouts.app')

@section('title', __("Services").' | ')

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="Services">
    @include('layouts.hero', ['title' => 'Questions fréquemment posées'])

    <div class="container">
        <div class="accordion mt--9" id="accordionExample">

            <x-collapse parentId="#accordionExample" :expanded="true">
                <x-slot name="title">
                    Who can use {{ $app_name }}
                </x-slot>
                <p>
                    {{ $app_name }} is an application accessible for everyone who is intended to organise a
                    spectacle,
                    summit
                    or try to gather people and need invitations which will be digitally verified.
                </p>
            </x-collapse>

            <x-collapse parentId="#accordionExample">
                <x-slot name="title">
                    Is {{ $app_name }} secured?
                </x-slot>
                <p>
                    Security and privacy prime alot for this solution, the more you use {{ $app_name }} for
                    events,
                    the more they are getting secured and third parties can control or access your
                    confidential data.
                </p>
            </x-collapse>


            <x-collapse parentId="#accordionExample">
                <x-slot name="title">
                    What if the account is not verified?
                </x-slot>
                <p>
                    if {{ $app_name }} find a non verified account there are some fumctionnalities that the user
                    whould not have to access. hence it is a must to verify your account and explore
                    this marvelous technology.
                </p>
            </x-collapse>

            <x-collapse parentId="#accordionExample">
                <x-slot name="title">
                    How many methods of payment do {{ $app_name }} support?
                </x-slot>
                <p>
                    {{ $app_name }} payment support PayPal and an alternative method using the online assistant
                    by just clicking on the message icon down, right corner of your device. which will
                    guide you to any SIKU administrators and can help you along the supply of your account.
                </p>
            </x-collapse>

            <x-collapse parentId="#accordionExample">
                <x-slot name="title">
                    How SMS or E-mails are being sent?
                </x-slot>
                <p>
                    SMS or E-mails are being sent after registering a model and guests who will receive
                    invitations, After that you can click on send to all or send one by one in
                    Product->sending and guests.
                </p>
            </x-collapse>

            <x-collapse parentId="#accordionExample">
                <x-slot name="title">
                    How do you do to validate data?
                </x-slot>
                <p>
                    There is a mobile App, that is designed to scan and validate access or not to
                    Authorize any entrance of guests. there is two types of granting access either
                    by QR_Code or a Code_Pin.
                </p>
            </x-collapse>

        </div>
    </div>
</div>
@endsection