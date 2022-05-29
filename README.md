<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Инструкция

Для работы приложения требуется:
- PHP ^7.4
- Composer
- npm

Подготовка:
```
composer install
npm install
```

В файле .env требуется добавить параметр OPEN_WEATHER_API_KEY со значением ключа API полученного на сайте <a href="https://openweathermap.org/forecast5">https://openweathermap.org/forecast5</a>

Запуск:
```
npm run watch
php artistan serve
```

Приложение доступно по адресу http://127.0.0.1:8000/
