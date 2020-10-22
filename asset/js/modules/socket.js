import LaraEcho from "laravel-echo"

export const Io = require('socket.io-client');

const host = document.querySelector('meta[name="ws-host"]')
let url = null

try {
    const p = new URL(host.getAttribute('content'))
    url = p.hostname
} catch (_) { }

export const Echo = new LaraEcho({
    broadcaster: 'socket.io',
    host: url || window.location.hostname,
    client: Io
});
