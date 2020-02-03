import { Component } from "@angular/core";
import { WeatherService } from "./weather.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title = "techspert-io-take-home";
  public cities = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService
      .getWeather()
      .subscribe(cities => (this.cities = cities.list));
  }
}
