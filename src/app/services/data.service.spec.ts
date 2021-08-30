
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {
  mockNewsData,
  mockNewsLatestItems,
  mockAskNewsItems,
  mockJobNewsItems,
  mockShowNewsItems,
  mockTableDataSource
} from '../testing-mocks';
import {News} from '../news';
import { DataService } from './data.service';


describe('DataService', () => {
  let dataService: DataService;

  let httpMock: HttpTestingController;
  //
  // const mockDataService = {
  //   getNewStories : jest.fn( () => of(mockNewsData)),
  //   getNewsItems : jest.fn( () => of(mockNewsLatestItems))
  // };
  const http = {
    get: jest.fn(),
    post: jest.fn()
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [DataService] // {provide: DataService, useValue: mockDataService}
    });

    dataService = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('newsStories to be called', () => {

    const Resp = {
        get : jest.fn().mockReturnValue(of(mockNewsData))
    };

    const mockUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    // const response = mockNewsData;
    dataService.getNewStories(mockUrl).subscribe(news => {
      expect(Resp.get).toBeDefined();
      expect(Resp.get).toHaveBeenCalled();
      expect(news).toEqual(mockNewsData);
    });
    const request = httpMock.expectOne('https://hacker-news.firebaseio.com/v0/newstories.json');
    expect(request.request.method).toBe('GET');
    request.flush(mockNewsData);
  });

  it('newsItems to be called', () => {

    const Resp = {
      get : jest.fn().mockReturnValue(of(mockNewsData))
    };

      const stories: News = mockNewsLatestItems;
      const mockVal = 28351476;
    dataService.getNewsItems(mockVal).subscribe(news => {
        expect(Resp.get).toBeDefined();
        expect(Resp.get).toHaveBeenCalled();
        expect(news).toBe(1);
        expect(news).toEqual(stories);
    });
    const request = httpMock.expectOne('https://hacker-news.firebaseio.com/v0/item/28351476.json?print=pretty');
    expect(request.request.method).toBe('GET');
    request.flush(stories);
  });


});
