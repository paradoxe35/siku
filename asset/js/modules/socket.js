import Echo from "laravel-echo"

export const Io = require('socket.io-client');

export const LaraEcho = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
    client: Io
});
