import { Component } from "@angular/core";
import { WeatherService, WeatherCity } from "./weather.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "techspert-io-take-home";

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather().subscribe(cities => {
      this.allCities = cities.list.map(({ id, name, main }) =>
        // Pull sortables out to top level for now
        ({
          id,
          name,
          ...main
        })
      );
      this.refreshDisplayed();
    });
  }

  private allCities: WeatherCity[] = [];
  public displayCities: WeatherCity[] = [];

  paginationOptions = [5, 10, 20, 50];
  availablePages: number[] = [1];

  private _currentPage: number = 1;
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(page: number) {
    this._currentPage = page;
    this.refreshDisplayed();
  }

  private _paginationSize: number = this.paginationOptions[0];
  get paginationSize(): number {
    return this._paginationSize;
  }
  set paginationSize(size: number) {
    this._paginationSize = size;
    this.currentPage = 1;
    this.refreshDisplayed();
  }

  private _sortField: string = "name";
  private _sortDir: [1, -1] | [-1, 1] = [1, -1];
  get sortField(): string {
    return this._sortField;
  }
  set sortField(field: string) {
    if ((this._sortField = field) === field) this._sortDir.reverse();
    this._sortField = field;
    this.currentPage = 1;
    this.refreshDisplayed();
  }

  private refreshDisplayed(): void {
    const sortedCities = this.allCities.sort((l, r) =>
      l[this.sortField] > r[this.sortField]
        ? this._sortDir[0]
        : this._sortDir[1]
    );

    const start = (this.currentPage - 1) * this.paginationSize;
    const end = this.currentPage * this.paginationSize;
    this.displayCities = sortedCities.slice(start, end);

    const numPages = Math.ceil(this.allCities.length / this.paginationSize);
    this.availablePages = Array.from(new Array(numPages), (x, i) => i + 1); // Range, starting at 1
  }
}
