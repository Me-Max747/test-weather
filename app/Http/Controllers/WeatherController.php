<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    const BASE_URI = "http://api.openweathermap.org/data/2.5/forecast";
    const CITY_LIST = array(
        "moscow" => array(
            "code" => "moscow",
            "query" => "Moscow",
            "name" => "Москва"
        ),
        "saint_petersburg" => array(
            "code" => "saint_petersburg",
            "query" => "Saint Petersburg",
            "name" => "Санкт Петербург"
        ),
        "tyumen" => array(
            "code" => "tyumen",
            "query" => "Tyumen",
            "name" => "Тюмень"
        ),
        "yekaterinburg" => array(
            "code" => "yekaterinburg",
            "query" => "Yekaterinburg",
            "name" => "Екатеринбург"
        )
    );

    private function prepareWeather($weather): array
    {
        $result = array(
            "id" => $weather->city->id,
            "name" => $weather->city->name,
            "coordinates" => $weather->city->coord,
            "items" => array()
        );

        foreach($weather->list as $key => $item){
            $result["items"][] = array(
                "code" => "weather_{$key}",
                "datetime" => date("d.m.Y H:i", $item->dt),
                "temp" => round($item->main->temp)." ℃",
                "humidity" => round($item->main->humidity)."%",
                "clouds" => round($item->clouds->all)."%",
                "wind" => round($item->wind->speed)." м/с",
                "description" => $item->weather[0]->description,
            );
        }

        return $result;
    }

    public function index(): JsonResponse
    {
        return response()->json(self::CITY_LIST, 200);
    }

    public function city($city)
    {
        if(!key_exists($city, self::CITY_LIST)){
            return abort(404);
        }

        $response = Http::get(self::BASE_URI, array(
            "q" => self::CITY_LIST[$city]["query"],
            "lang" => "ru",
            "appid" => config('app.open_weather_api_key'),
            "units" => "metric"
        ));
        $weather = json_decode($response);

        if($weather->cod !== "200"){
            return abort(404);
        }

        $weather = $this->prepareWeather($weather);
        return response()->json($weather, 200);
    }
}
