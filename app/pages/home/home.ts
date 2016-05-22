import {Page, NavController} from 'ionic-angular';
import {Github} from '../../providers/github/github';
import {DetailsPage} from '../details/details';

@Page({
  templateUrl: 'build/pages/home/home.html',
    providers: [Github]
})
export class HomePage {
  public foundRepos;
  public username;

  constructor(private github: Github, private nav: NavController) {
  }

  goToDetails(repo) {
    this.nav.push(DetailsPage, { repo: repo });
}

  getRepos(){
    this.github.getRepos(this.username).subscribe(
      data =>{
        this.foundRepos = data.json();
      },
      err => console.log(err),
      () => console.log('getRepos completed')
    );
  }
}
