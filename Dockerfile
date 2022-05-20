FROM php:7.4-cli

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

#  Install supervisors
RUN apt-get update \
    && apt-get install -y supervisor \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# copy project files
COPY . /usr/src/siku

# work directory
WORKDIR /usr/src/siku

# Chnage php memory limit
ENV PHP_MEMORY_LIMIT 512M
ENV PHP_UPLOAD_LIMIT 512M

# Install system dependencies AND Install PHP extensions
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
    docker-php-ext-configure ldap --with-libdir="lib/$debMultiarch"; \
    docker-php-ext-install -j "$(nproc)" \
    bcmath \
    exif \
    gd \
    intl \
    ldap \
    opcache \
    pcntl \
    pdo_mysql \
    pdo_pgsql \
    zip \
    gmp \
    ;\
    \
    composer install

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install yarn dependencies
RUN yarn install && yarn run prod

# Remove node modules
RUN rm -rf node_modules

# Install laravel echo server globally
RUN yarn global add laravel-echo-server

# Port
EXPOSE 8000

# clear all laravel cache
RUN php artisan config:cache && \
    php artisan route:cache

# Supervisor copy
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Run migrations
RUN chmod +x docker-startup.sh

# run app with supervisor
CMD ["/usr/bin/supervisord"]
