import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ScrollableDirective } from '../../core/directives/scrollable.directive';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { GithubService } from '../../core/services/github.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-user-repos',
  imports: [
    CommonModule,
    MatIconModule,
    ScrollableDirective,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './user-repos.component.html',
  styleUrl: './user-repos.component.scss'
})
export class UserReposComponent {
  userLogin: any = '';
  userName: any = '';
  userType: any = '';
  pageNumber: number = 1;
  userRepos: any[] = [];
  loading: boolean = false;
  reposComplete: boolean = false;
  reposSubscription$!: Subscription;
  queryParamsSubscription$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.queryParamsSubscription$ = this.route.queryParams.subscribe(params => {
      this.userLogin = params['login'];
      this.userType = params['type'];
      this.userName = params['name'];
      if (!this.userLogin) {
        this.router.navigate(['/']);
      }
      this.loadRepos();
    });
  }

  loadRepos() {
    this.loading = true;
    this.reposSubscription$ = this.githubService.getRepositories(this.userLogin, this.pageNumber).pipe(
      catchError((err) => {
        this.loading = false;
        this.notificationService.showError(err);
        return throwError(() => new Error(err));
      }),
    ).subscribe((repos: any) => {
      if (repos.length !== 0) {
        this.pageNumber++;
        this.userRepos.push(...repos);
      } else {
        this.reposComplete = true;
      }
      this.loading = false;
    });
  }

  onScrollLoad() {
    if (!this.reposComplete && !this.loading) {
      this.loadRepos();
    }
  }

  ngOnDestroy() {
    this.queryParamsSubscription$.unsubscribe();
    this.reposSubscription$.unsubscribe();
  }
}
