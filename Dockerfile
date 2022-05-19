FROM php:7.4-cli

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN apt-get update \
    && apt-get install -y supervisor \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY . /usr/src/siku

WORKDIR /usr/src/siku

ENV PHP_MEMORY_LIMIT 512M
ENV PHP_UPLOAD_LIMIT 512M

RUN apt-get update; \
    apt-get install -y --no-install-recommends \
    libcurl4-openssl-dev \
    libevent-dev \
    libfreetype6-dev \
    libicu-dev \
    libjpeg-dev \
    libldap2-dev \
    libmcrypt-dev \
    libmemcached-dev \
    libpng-dev \
    libpq-dev \
    libxml2-dev \
    libmagickwand-dev \
    libzip-dev \
    libwebp-dev \
    libgmp-dev \
    ; \
    \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp; \
    docker-php-ext-install -j "$(nproc)" \
    bcmath \
    exif \
    gd \
    intl \
    opcache \
    pcntl \
    pdo_mysql \
    pdo_pgsql \
    zip \
    gmp \
    ;\
    \
    composer install

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN npm install \
    && npm run prod

EXPOSE 8000

COPY .env.example .env

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN php artisan key:generate

RUN php artisan storage:link

CMD ["/usr/bin/supervisord"]

