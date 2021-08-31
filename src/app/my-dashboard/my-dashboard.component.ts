import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {News} from '../news';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  newsStories = [];

  imagePath = '../assets/avatar.svg';
  private subscription: Subscription;
  private subscription2: Subscription;
  storyType: string;

  latestNewsUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
  askNewsUrl    = 'https://hacker-news.firebaseio.com/v0/askstories.json';
  showNewsUrl   = 'https://hacker-news.firebaseio.com/v0/showstories.json';
  jobNewsUrl    = 'https://hacker-news.firebaseio.com/v0/jobstories.json';

  public displayedColumns = ['id', 'avatar', 'by', 'title', 'time', 'type', 'goTo', 'share', 'favorite', 'bookmark'];
  public dataSource = new MatTableDataSource<News>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private dataCreated: any;
  public errorMessage: any;
  private filteredByName: News;
  private filteredData: News[];

  constructor(readonly dataService: DataService, readonly formBuilder: FormBuilder) {
  }

  // range = new FormGroup({
  //   username : new FormControl()
  // });

   range = this.formBuilder.group({
    username : '',
  });


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    }

  ngOnInit(): void {
    this.getStories(this.latestNewsUrl);
  }

  changeStoryType(val): void {
    this.newsStories = [];
    this.storyType = val;
    if (val === 'Ask') {
      this.getStories(this.askNewsUrl);
    } else if (val === 'Show') {
      this.getStories(this.showNewsUrl);
    } else if (val === 'Job') {
      this.getStories(this.jobNewsUrl);
    } else {
      this.getStories(this.latestNewsUrl);
    }
  }

  convertTime(timestamp): string {
    const a = new Date(timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  getStories(newsUrl: string): void {
    this.subscription = this.dataService.getNewStories(newsUrl).subscribe((data: any) => {
        if (data) {
          data.forEach((storyId) => {
            this.subscription2 = this.dataService.getNewsItems(storyId).subscribe((res: News) => {
              this.newsStories.push(res);
              this.dataSource.data = this.newsStories;
            }, (error) => {
              console.error('error caught from getNewsItems in component', error);
               this.errorMessage = error;
            });
          });
        }
      }, (error) => {
        console.error('error caught from getStories in component', error);
         this.errorMessage = error;
      });
    }


  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  searchByUserName(): void {
    if (this.newsStories && this.newsStories.length > 0) {
      if (this.range.value.username) {
        this.dataSource.data = this.newsStories.filter(x => {
          if (x && x.by != null) {
            return  x.by === this.range.value.username;
          }
        });
      }
    }
  }

  resetFilter(): void {
    this.range.patchValue( {'username': null} );
    this.newsStories = [];
    this.getStories(this.latestNewsUrl);
  }


}
