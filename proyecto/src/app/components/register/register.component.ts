import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService]

})
export class RegisterComponent implements OnInit{
    public title:string;
    public user: User;
    public status: string;
    emailForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        
    ){
       this.title= 'Registrate';
       this.status = '';
       this.user = new User("",
      "",
      "",
      "",
      "",
      "",
      "ROLE_USER",
      "",
       );
       this.emailForm= this.fb.group({
        email:['',[Validators.required, Validators.email]]
    })
    }


    ngOnInit(): void {
        console.log('componente de register cargando...');
        
    }
    onSubmit (form: NgForm ){
    //     this._userService.register(this.user).subscribe(
    //         response => {
    //            if (response.user && response.user._id){
    //             // console.log(response.user);

    //             this.status= 'success';
    //             form.reset();
    //            }else{
    //             this.status ='error';
    //            }
    //         },
    //         error => {
    //             console.log(<any>error);
    //         }
    //     );
        
    }
}; 
