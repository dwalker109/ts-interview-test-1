import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { KelvinPipe } from "./kelvin.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "./weather.service";
import { MockWeatherService } from "./weather.mock.service";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, KelvinPipe],
      imports: [BrowserModule, HttpClientModule, FormsModule],
      providers: [{ provide: WeatherService, useClass: MockWeatherService }]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'techspert-io-take-home'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("techspert-io-take-home");
  });

  it("should provide 5 items per page", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const data = fixture.debugElement.componentInstance.displayCities;
    expect(data.length).toBe(5);
  });

  it("should provide 10 items per page", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.debugElement.componentInstance.paginationSize = 10;
    fixture.detectChanges();
    const data = fixture.debugElement.componentInstance.displayCities;
    expect(data.length).toBe(10);
  });

  it("should filter the list by city name", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.debugElement.componentInstance.filter = "filter_me";
    fixture.detectChanges();
    const data = fixture.debugElement.componentInstance.displayCities;
    expect(data.length).toBe(1);
  });
});
