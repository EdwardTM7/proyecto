import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
// import { UserService } from 'src/app/services/user.service';



@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title:string;
    public user: User;
    public status: string;
    public identity: any;
    public token:string |undefined;
    


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private fb: FormBuilder,

    ){
       this.title= 'Identificate'; 
       this.user = new User ("","","","","","","ROLE_USER","",);
        //  this._router.navigate(['/']);
         this.status = '';
       
    }
    ngOnInit(): void {
        console.log('componente de login cargado...');
        
    }

    onSubmit(){
        // //logear al usuario consiguiendo datos
        // this._userService.signup(this.user).subscribe(
        //     response =>{
        //         this.identity =response.user;

        //         console.log(this.identity);
        //         if(!this.identity || !this.identity._id){
        //         this.status='error';
        //          }else{

        //              localStorage.setItem('identity', JSON.stringify(this.identity));

        //          this.getToken();
        //          }
        //     },
        //     error =>{
        //         var errorMessage = <any>error;
        //         console.log (errorMessage);

        //         if(errorMessage !=null){
        //             this.status = 'error';
        //         }
        //     }
        // );
        // // console.log(this.user);
        // // alert(this.user.email);
        // // alert(this.user.password);
    }

    getToken(){
        // this._userService.signup(this.user, 'true').subscribe(
        //     response =>{
        //         this.identity =response.token;
        //         console.log(this.token);
        //         if(this.token.leng <=0){
        //         this.status='error';
        //          }else{

        //             localStorage.setItem('token',this.token);

                       this.getCounters();

        //             
        //          }
        //     },
        //     error =>{
        //         var errorMessage = <any>error;
        //         console.log (errorMessage);

        //         if(errorMessage !=null){
        //             this.status = 'error';
        //         }
    }
        getCounters(){
            // this._userService.getCounters().subscribe(
            //     response => {
            //         localStorage.setItem('stats',JSON.stringify(response));
            //         this.status ='success';
            //         this._router.navigate(['/']);

            //         }

            //     },
            //     error =>{
            //         console.log (<any>error);
            //     }
            // )
        }

}