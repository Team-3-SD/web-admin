import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from '../../../models/productos.models';
import Swal from 'sweetalert2';
import { MarcasService } from 'src/app/services/marcas.service';
import { Marcas } from 'src/app/models/marca.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
})
export class NuevoProductoComponent implements OnInit {
  imagenSubir;
  state = 1;
  productCreate: Producto;
  imagenDefault: any = 'assets/images/product-default.jpg';
  brands: Marcas[];
  public productoForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    private marcaService: MarcasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.marcaService.cargarMarcas().subscribe((m) => {
      this.brands = m;
    });
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  guardarProduct() {
    const { nombre } = this.productoForm.value;
    this.productCreate = {
      name: this.productoForm.value['nombre'],
      brand: this.productoForm.value['brand'],
      price: this.productoForm.value['price'],
      stock: this.productoForm.value['stock'],
      description: this.productoForm.value['description'],
      state: this.state,
    };
    this.productService
      .addProduct(this.imagenSubir, this.productCreate)
      .subscribe((resp: any) => {
        console.log(resp);

        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/productos`);
      });
  }
  onCheckboxChange(e) {
    if (e.target.checked) {
      console.log('GAAAAAAAA');
    } else {
      console.log('GACITOOO');
    }
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return (this.imagenDefault = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenDefault = reader.result;
    };
  }
}
