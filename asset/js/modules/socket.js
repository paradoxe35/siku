import LaraEcho from "laravel-echo"

export const Io = require('socket.io-client');

export const Echo = new LaraEcho({
    broadcaster: 'socket.io',
    host: window.location.hostname,
    client: Io
});
