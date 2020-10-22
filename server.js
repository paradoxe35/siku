require('dotenv').config();

const env = process.env;

require('laravel-echo-server').run({
    authHost: 'http://localhost',
    devMode: env.APP_DEBUG,
    authEndpoint: "/broadcasting/auth",
    database: "redis",
    databaseConfig: {
        redis: {
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            password: env.REDIS_PASSWORD
        }
    }
});