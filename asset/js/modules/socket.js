import LaraEcho from "laravel-echo"

export const Io = require('socket.io-client');

const host = document.querySelector('meta[name="ws-host"]')

export const Echo = new LaraEcho({
    broadcaster: 'socket.io',
    host: host ? host.getAttribute('content') : window.location.hostname,
    client: Io
});
