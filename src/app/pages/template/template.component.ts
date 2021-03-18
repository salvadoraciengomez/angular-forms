import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

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

  paises:any[]=[];
  constructor(private paisSvc:PaisService) { }

  ngOnInit(): void {
    this.paisSvc.getPaises().subscribe(paises=>{
      console.log(paises);
      this.paises=paises;
    });
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
