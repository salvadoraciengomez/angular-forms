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
      apellido: ['',Validators.required],
      correo: ['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0]{2,3}$'), Validators.required]]
    });
  }
  guardar(){
    console.log(this.forma);
  }

}
