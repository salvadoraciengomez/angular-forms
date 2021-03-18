import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario={
    nombre: 'Usuario',
    apellido: 'Asdds',
    correo: 'asdf@sdf.fd'
  }
  constructor() { }

  ngOnInit(): void {
  }

  guardar(forma:NgForm){
    if (forma.invalid){
      Object.values(forma.controls).forEach(control=>{
        // console.log(control);
        control.markAsTouched();
      });
    }
  }
}
