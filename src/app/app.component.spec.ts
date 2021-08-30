import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import {Observable, of} from 'rxjs';
import {mockNewsData, mockNewsLatestItems} from './testing-mocks';

describe('AppComponent', () => {


  let dataService: DataService;


  const mockDataService = {
      getNewStories : jest.fn( () => of(mockNewsData)),
      getNewsItems : jest.fn( () => of(mockNewsLatestItems))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {provide: DataService, useValue: mockDataService}]
    }).compileComponents();
  }));

  afterEach(() => { jest.clearAllMocks(); });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    dataService = TestBed.get(DataService);

    expect(app).toBeTruthy();
    fixture.detectChanges();
  }));
});
