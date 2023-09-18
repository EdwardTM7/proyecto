import { Component, OnInit, DoCheck } from '@angular/core';
// import { InterpolacionComponent } from './interpolacion/interpolacion.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title: string;
  public identity: any;
  public url: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.title = 'PROYECTO';
    this.url = GLOBAL.url;
  }
  
    ngOnInit(){
      this.identity= this._userService.getIdentity();

    }

    ngDoCheck(){
      this.identity = this._userService.getIdentity();
    }


  logout(){
    localStorage.clear();
    this.identity =null
    this._router.navigate(['/']);
  }
 
}
