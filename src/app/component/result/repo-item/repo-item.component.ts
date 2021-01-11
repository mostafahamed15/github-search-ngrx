import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GithubRepo } from '../../../models/githubRepository.model';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoItemComponent implements OnInit {
  @Input() item: GithubRepo;
  constructor() { }

  ngOnInit(): void {
  }

}
