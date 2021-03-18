import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      nombre: ['defaultValue'],
      apellido: [''],
      correo: ['']
    });
  }
  guardar(){
    console.log(this.forma);
  }

}
