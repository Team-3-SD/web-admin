import { Component, OnInit } from '@angular/core';
import { Marcas } from 'src/app/models/marca.models';
import { Producto } from 'src/app/models/productos.models';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  products: Producto[];
  marcas: Marcas[];
  state = [
    { id: 1, name: 'disponible' },
    { id: 0, name: 'no disponible' },
  ];
  public cargando: boolean = true;
  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarProductos().subscribe((p) => {
      this.cargando = false;
      this.products = p;
      this.products.forEach((p) => {
        p.state_name = this.state.filter((s) => s.id == p.state)[0].name;
      });
    });
  }
}
