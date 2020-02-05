import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface WeatherResult {
  message: string;
  cod: string;
  count: number;
  list: WeatherCity[];
}
export interface WeatherCity {
  id: number;
  name: string;
  main: any; // Will be flattened into items below on use
  temp?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
}

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherResult> {
    return this.http.get<WeatherResult>(
      "https://api.openweathermap.org/data/2.5/find?lat=52.205276&lon=0.119167&cnt=50&appid=194333f5b09188fbda8c4a3bbfea30b2"
    );
  }
}
