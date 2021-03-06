import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;
  constructor(private formBuilder:FormBuilder, private validadores:ValidadoresService) {
    this.crearForm();
    this.cargarDatos();
    this.crearListener();
  }

  ngOnInit(): void {
  }


  crearForm(){
    this.forma=this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.minLength(5)]], //1ºarg: defaultValue. 2ºarg: validadores sincronos (no requieren acceso exterior), 3º validadores asíncronos
      apellido: ['',[Validators.required,Validators.minLength(5), this.validadores.noHitler]],
      correo: ['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0]{2,3}$'), Validators.required]],
      usuario: ['',,this.validadores.existeUsuario],
      pass1: ['',  Validators.required],
      pass2: ['',  Validators.required],
      direccion: this.formBuilder.group({
        calle: ['', Validators.required],
        ciudad: ['',Validators.required],
      }),
      pasatiempos: this.formBuilder.array([])
    },
    {
      validators: [
        this.validadores.passwordsIguales('pass1','pass2')
      ]
    });
  }


  cargarDatos(){
    // this.forma.setValue({ //setValue requiere valores para cada campo //reset ignora las no establecidas, escribe en el campo el valor pero control.value=null
    this.forma.reset({
      nombre:'Username',
      apellido: 'Surname',
      correo: 'email@domain.dot',
      pass1:'123',
      pass2:'123',
      direccion:{
        calle: 'StreetName',
        ciudad: 'CityName'
      }
    });


    //Manera de especificar un array predefinido en pasatiempos
    ['Bicicleta', 'Música', 'Mascota'].forEach(valor=>this.pasatiempos.push(this.formBuilder.control(valor)));
  }

  crearListener(){
    this.forma.valueChanges.subscribe( valor=>{
      console.log(valor);
    } );

    this.forma.statusChanges.subscribe(status=>{
      console.log({status});
    });
  }


  agregarPasatiempo(){
    // this.pasatiempos.push(this.formBuilder.control('Nuevo elemento', Validators.required));
    this.pasatiempos.push(this.formBuilder.control(''));
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.forma);
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control=>{
        console.log(control);
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(control=> control.markAsTouched());
        }
        else control.markAsTouched();
      });
    }
    this.forma.reset();
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

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get calleNoValido(){
    return this.forma.get('direccion.calle').invalid && this.forma.get('direccion.calle').touched;

  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;

  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido(){

    const pass1= this.forma.get('pass1').value;
    const pass2= this.forma.get('pass2').value;

    return (pass1===pass2) ? false : true;

  }
}
