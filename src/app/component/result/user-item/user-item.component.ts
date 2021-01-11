import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GithubUser } from '../../../models/githubUser.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent implements OnInit {
  @Input() item: GithubUser;
  constructor() { }

  ngOnInit(): void {
  }

}
