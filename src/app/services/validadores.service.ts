import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

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
}
