import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-conductor',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-conductor.component.html',
  styleUrl: './crear-conductor.component.css'
})
export class CrearConductorComponent implements OnInit {
  data: any = {};
  private cdr = inject(ChangeDetectorRef); // Inyecta ChangeDetectorRef
  form: FormGroup;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      curp: [''] // Inicializa el control del formulario
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const curp = this.form.get('curp')?.value; // Obtiene el valor del CURP del formulario
    if (curp) {
      this.fetchData(curp); // Llama a fetchData con el CURP ingresado
    }
  }

  fetchData(curp: string) {
    this.httpClient                                                   //898ffb5b-102f-459b-95bb-ec56097499cf
      .get(`https://api.valida-curp.com.mx/curp/obtener_datos/?token=898ffb5b-102f-459b-95bb-ec56097499cf&curp=${curp}`)
      .subscribe((data: any) => {
        console.log(data);
        // Procesa los datos según sea necesario
        this.data = data.response.Solicitante; // Extrae solo el objeto `Solicitante`
        this.cdr.detectChanges(); // Forzar la detección de cambios
        
        
        //PROBABLE SUBIDA DE ARCH A FIREBASE?
        //const solicitante = data.response.Solicitante; // Extrae solo el objeto `Solicitante`
        //this.uploadToFirebase(solicitante); // Llama a la función para subir los datos a Firebase
      });
  }

  /*
  uploadToFirebase(solicitante: any) {
    this.db.list('/solicitantes').push(solicitante)
      .then(() => {
        console.log('Datos subidos a Firebase exitosamente');
      })
      .catch((error) => {
        console.error('Error al subir los datos a Firebase', error);
      });
  }
  */
}
