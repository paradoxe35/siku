git push heroku master
heroku run php artisan queue:restart
heroku run php npm install -g laravel-echo-server
heroku run laravel-echo-server start
heroku run php artisan queue:work --queue=high,default,invitation