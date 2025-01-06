import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserReposComponent } from './user-repos.component';
import { ActivatedRoute, provideRouter, Router, RouterModule } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { NotificationService } from '../../core/services/notification.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UserReposComponent', () => {
  let component: UserReposComponent;
  let fixture: ComponentFixture<UserReposComponent>;
  let githubService: GithubService;
  let notificationService: NotificationService;
  let httpMock: HttpTestingController;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReposComponent, RouterModule],
      providers: [GithubService, NotificationService, provideHttpClient(), provideHttpClientTesting(), {
        provide: ActivatedRoute,
        useValue: {
          queryParams: of({ userName: 'test' })
        },
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserReposComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    notificationService = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
