import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Marcas } from 'src/app/models/marca.models';
import { MarcasService } from 'src/app/services/marcas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-marca',
  templateUrl: './nueva-marca.component.html',
})
export class NuevaMarcaComponent implements OnInit {
  public marcaForm: FormGroup;
  marcaCreate: Marcas;
  constructor(
    private fb: FormBuilder,
    private marcaService: MarcasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.marcaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  guardarMarca() {
    const { nombre } = this.marcaForm.value;
    this.marcaCreate = {
      id: 0,
      name: this.marcaForm.value['nombre'],
    };
    this.marcaService.addMarca(this.marcaCreate).subscribe((resp: any) => {
      console.log(resp);

      Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/marcas`);
    });
  }
}
