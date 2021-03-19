import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.crearForm();
  }

  ngOnInit(): void {
  }
  crearForm(){
    this.forma=this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.minLength(5)]], //1ºarg: defaultValue. 2ºarg: validadores sincronos (no requieren acceso exterior), 3º validadores asíncronos
      apellido: ['',[Validators.required,Validators.minLength(5)]],
      correo: ['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0]{2,3}$'), Validators.required]]
    });
  }
  guardar(){
    console.log(this.forma);
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control=>{
        console.log(control);
        control.markAsTouched();
      });
    }
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;

  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;

  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;

  }
}
