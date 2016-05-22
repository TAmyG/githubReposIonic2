import {Page, NavController, NavParams} from 'ionic-angular';
import {Github} from '../../providers/github/github';

/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/details/details.html',
    providers: [Github]
})
export class DetailsPage {
  public readme = '';
  public repo;
  constructor(private github: Github, public nav: NavController, private navParams: NavParams) {
    this.repo = navParams.get('repo');
    
    this.github.getDetails(this.repo).subscribe(
        data => this.readme = data.text(),
        err => {
            if (err.status == 404) {
                this.readme = 'This repo does not have a README. :(';
            } else {
                console.error(err);
            }
        },
        () => console.log('getDetails completed')
    );
  }
}
