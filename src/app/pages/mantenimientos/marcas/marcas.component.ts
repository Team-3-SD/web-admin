import { Component, OnInit } from '@angular/core';
import { Marcas } from 'src/app/models/marca.models';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
})
export class MarcasComponent implements OnInit {
  marcas: Marcas[];
  public cargando: boolean = true;
  constructor(private marcaService: MarcasService) {}

  ngOnInit(): void {
    this.marcaService.cargarMarcas().subscribe((m) => {
      this.marcas = m;
      this.cargando = false;
    });
  }
}
