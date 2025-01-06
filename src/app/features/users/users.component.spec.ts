import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { GithubService } from '../../core/services/github.service';
import { NotificationService } from '../../core/services/notification.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let githubService: GithubService;
  let notificationService: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [GithubService, NotificationService, provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    githubService = TestBed.inject(GithubService);
    notificationService = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
