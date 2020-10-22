require('dotenv').config();

const env = process.env;

require('laravel-echo-server').run({
    authHost: env.APP_URL,
    devMode: env.APP_DEBUG,
    database: "redis",
    devMode: process.env.ECHO_DEV_MODE,
    host: process.env.ECHO_HOST,
    protocol: process.env.ECHO_PROTOCOL,
    port: process.env.ECHO_PORT,
    databaseConfig: {
        redis: {
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            password: env.REDIS_PASSWORD
        }
    },
    "verifyAuthPath": true,
    "verifyAuthServer": true
});