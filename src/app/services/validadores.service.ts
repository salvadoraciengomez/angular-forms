import { Injectable } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHitler(control: FormControl):{[s:string]:boolean} {

    if (control.value?.toLowerCase() ==='hitler'){   ///Ojo a la interrogación , evita que haya error al hacer un lowerCase con números
      return{
        noHitler: true
      }
    }
    return null;

  }

  passwordsIguales(pass1Name:string, pass2Name:string){

    return(formGrp:FormGroup)=>{
      const pass1Control= formGrp.controls[pass1Name];
      const pass2Control= formGrp.controls[pass2Name];

      if(pass1Control.value=== pass2Control.value){
        pass2Control.setErrors(null);
      }
      else pass2Control.setErrors({noEsIgual: true});
    }

  }

  existeUsuario(control:FormControl):Promise<ErrorValidate>|Observable<ErrorValidate>{

    if(!control.value){
      return Promise.resolve(null);
    }


    return new Promise(  (resolve,reject) =>{
      setTimeout(()=>{
        if (control.value==='strider') resolve({existe:true});
        else resolve(null);
      }, 3500);
    }    );
  }
}
