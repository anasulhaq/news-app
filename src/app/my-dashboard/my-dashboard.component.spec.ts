import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from '../services/data.service';
import {MyDashboardComponent} from './my-dashboard.component';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
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
import mock = jest.mock;

describe('MyDashboardComponent', () => {

  let component: MyDashboardComponent;
  let fixture: ComponentFixture<MyDashboardComponent>;
  let dataService: DataService;

  const mockDataService = {
    getNewStories : jest.fn( () => of(mockNewsData)),
    getNewsItems : jest.fn( () => of(mockNewsLatestItems))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, HttpClientModule, RouterTestingModule,
        CdkTableModule, MatTableModule],
      declarations: [MyDashboardComponent],
      providers: [{provide: DataService, useValue: mockDataService}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDashboardComponent);

    dataService = TestBed.get(DataService);

    // component.dataSource = new MatTableDataSource<News>(mockTableDataSource);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => { jest.clearAllMocks(); });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  describe('ngOnInit', () => {
    test('ngOnInit, test if getStories is called', () => {
      // Arrange
      const getInputParamSpy = jest.spyOn(component, 'getStories');
      // Act
      component.ngOnInit();
      // Assert
      expect(getInputParamSpy).toHaveBeenCalled();
    });

    test('ngOnInit, test if changeStoryType is called with Ask Param ', () => {
      // Arrange
      const mockParam = 'Ask';
      component.askNewsUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
      const getInputParamSpy = jest.spyOn(component, 'getStories');
      // Act
      component.changeStoryType(mockParam);
      // Assert
      expect(getInputParamSpy).toHaveBeenCalled();
    });

    test('ngOnInit, test if changeStoryType is called with Show Param ', () => {
      // Arrange
      const mockParam = 'Show';
      component.askNewsUrl = 'https://hacker-news.firebaseio.com/v0/showstories.json';
      const getInputParamSpy = jest.spyOn(component, 'getStories');
      // Act
      component.changeStoryType(mockParam);
      // Assert
      expect(getInputParamSpy).toHaveBeenCalled();
    });

    test('ngOnInit, test if changeStoryType is called with Job Param ', () => {
      // Arrange
      const mockParam = 'Job';
      component.askNewsUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
      const getInputParamSpy = jest.spyOn(component, 'getStories');
      // Act
      component.changeStoryType(mockParam);
      // Assert
      expect(getInputParamSpy).toHaveBeenCalled();
    });

    test(' null passed to getStories', () => {
      const getInputParamSpy2 = jest.spyOn(component.dataService, 'getNewStories');
      const mockParamUrl = null;
      component.getStories(mockParamUrl);
      expect(getInputParamSpy2).toHaveBeenCalledWith(null);
    });

    test('Test for Apply filter method', () => {
      const mockValue = 'test';
      const getInputParamSpy = jest.spyOn(component, 'applyFilter');
      component.applyFilter(mockValue);
      expect(getInputParamSpy).toHaveBeenCalled();
      expect(component.dataSource.filter).toEqual(mockValue);
    });

    test('ngAfterViewInit, test for Paginator', () => {
      component.ngAfterViewInit();
      expect(component.dataSource.paginator).toEqual(component.paginator);
    });

    test('ngAfterViewInit, test for Sort', () => {
      component.ngAfterViewInit();
      expect(component.dataSource.sort).toEqual(component.sort);
    });

    // test('convertTime, test for called', () => {
    //   const getInputParamSpy = jest.spyOn(component, 'convertTime');
    //   const mockParam = '1567382400';
    //   component.convertTime(mockParam);
    //   expect(getInputParamSpy).toHaveBeenCalled();
    //
    // });
  });



});
