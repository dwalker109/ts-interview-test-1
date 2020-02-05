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
      const temps: number[] = cities.list.map(({ main: { temp } }) => temp);

      this.meanTemp =
        temps.reduce((reducer, current) => reducer + current, 0) / temps.length;

      this.allCities = cities.list.map(({ id, name, main }) => ({
        id,
        name,
        ...main // Pull these out to make search simple
      }));
      this.cacheDisplayCities();
    });
  }

  allCities: WeatherCity[] = [];
  displayCities: WeatherCity[] = [];
  meanTemp: number;

  paginationOptions = [5, 10, 20, 50];
  availablePages: number[] = [1];

  private _currentPage: number = 1;
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(page: number) {
    this._currentPage = page;
    this.cacheDisplayCities();
  }

  private _paginationSize: number = this.paginationOptions[0];
  get paginationSize(): number {
    return this._paginationSize;
  }
  set paginationSize(size: number) {
    this._paginationSize = size;
    this.reset();
    this.cacheDisplayCities();
  }

  private _sortField: string = "name";
  private _sortDir: [1, -1] | [-1, 1] = [1, -1];
  get sortField(): string {
    return this._sortField;
  }
  set sortField(field: string) {
    if ((this._sortField = field) === field) this._sortDir.reverse();
    this._sortField = field;
    this.reset();
    this.cacheDisplayCities();
  }

  private _filter: string;
  get filter(): string {
    return this._filter;
  }
  set filter(searchString: string) {
    this._filter = searchString;
    this.reset();
    this.cacheDisplayCities();
  }

  private reset(): void {
    this.currentPage = 1;
  }

  private cacheDisplayCities(): void {
    const numPages = Math.ceil(this.allCities.length / this.paginationSize);
    this.availablePages = Array.from(new Array(numPages), (x, i) => i + 1); // Range, starting at 1

    const regex = new RegExp(this.filter || ".*");
    const filteredCities = this.allCities.filter(it => regex.test(it.name));

    const sortedCities = filteredCities.sort((l, r) =>
      l[this.sortField] > r[this.sortField]
        ? this._sortDir[0]
        : this._sortDir[1]
    );

    const start = (this.currentPage - 1) * this.paginationSize;
    const end = this.currentPage * this.paginationSize;
    const paginatedCities = sortedCities.slice(start, end);

    this.displayCities = paginatedCities;
  }
}
