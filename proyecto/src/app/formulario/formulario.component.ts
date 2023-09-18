import { Component } from '@angular/core';
import{FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
   OpenAlert: boolean= false;

  mostrar_en_consola(name:string) {
    console.log(name);

    this.OpenAlert = true;

  };
  mostrar_en_consola_2(passw:string) {
    console.log(passw);

    this.OpenAlert = true;

  }

  get usuario(){
    return this.formUser.get('usuario');
  }
  get password(){
    return this.formUser.get('password');
  }

  formUser = new FormGroup({
    'usuario': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  // usuario= new FormControl ('', Validators.required);
  // password=new FormControl('', Validators.required);
}
