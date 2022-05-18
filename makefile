predeploy:
	git push heroku master
	heroku run "php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force && composer install --optimize-autoloader --no-dev"

echo-server:
	laravel-echo-server start

queue:
	php artisan queue:listen --queue=high,default,invitation,notifications

server:
	php artisan serve --host=0.0.0.0
