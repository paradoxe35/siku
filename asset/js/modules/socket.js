//@ts-check
import LaraEcho from "laravel-echo"

export const Io = require('socket.io-client');

const wshost = document.querySelector('meta[name="ws-host"]')
const wsport = document.querySelector('meta[name="ws-port"]')
let url = wshost.getAttribute('content')
let port = wsport ? wsport.getAttribute('content') : null

port = port !== null && port.trim().length > 0 ? ':' + port : ''

export const Echo = new LaraEcho({
    broadcaster: 'socket.io',
    host: url !== null && url.trim().length > 0 ? url : window.location.hostname + port,
    client: Io
});

// @ts-ignore
export const UserChannel = () => Echo.channel("App.User." + window.auth.id)