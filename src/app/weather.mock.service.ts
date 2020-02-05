import { Observable, of } from "rxjs";
import { WeatherResult, WeatherCity } from "./weather.service";

const CITY: WeatherCity = {
  name: "a",
  id: 1,
  main: { temp: 1, feels_like: 1, temp_min: 1, temp_max: 1 }
};

export class MockWeatherService {
  getWeather(): Observable<WeatherResult> {
    return of({
      message: "ok",
      cod: "ok",
      count: 50,
      list: [
        CITY,
        CITY,
        CITY,
        CITY,
        { ...CITY, name: "filter_me" },
        CITY,
        CITY,
        CITY,
        CITY,
        CITY
      ]
    });
  }
}
