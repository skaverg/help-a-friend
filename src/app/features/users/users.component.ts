import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, forkJoin, mergeMap, Subscription, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ScrollableDirective } from '../../core/directives/scrollable.directive';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { GithubService } from '../../core/services/github.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    MatIconModule,
    ScrollableDirective,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  since: number = 1;
  userDetails: any[] = [];
  loading: boolean = false;
  repoSubscription$!: Subscription;

  constructor(
    private githubService: GithubService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadUserData(0);
  }

  loadUserData(since: number) {
    this.loading = true;
    this.repoSubscription$ = this.githubService.getUsers(since).pipe(
      catchError((err) => this.handleError(err)),
      mergeMap((users: any) => {
        const details = users.map((user: any) => this.githubService.getUserByUsername(user.login));
        return forkJoin(details).pipe(catchError((err) => this.handleError(err)));
      })
    ).subscribe((users: any) => {
      this.userDetails.push(...users);
      this.loading = false;
    });
  }

  handleError(err: any) {
    this.loading = false;
    this.notificationService.showError(err);
    return throwError(() => new Error(err));
  }

  onCardClick(user: any) {
    const { login, name, type } = user;
    this.router.navigate(['/user-repos'], { queryParams: { login, name, type } });
  }

  onScrollLoad() {
    const lastUserId = this.userDetails[this.userDetails.length - 1].id
    if (this.since !== lastUserId) {
      this.since = lastUserId;
      this.loadUserData(this.since);
    }
  }

  ngOnDestroy() {
    this.repoSubscription$.unsubscribe();
  }
}
