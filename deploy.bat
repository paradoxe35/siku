git push heroku master
@REM heroku run php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force && composer install --optimize-autoloader --no-dev
heroku run php artisan migrate --force