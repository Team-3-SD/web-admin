import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/productos.models';

const api_productos = environment.api_productos;

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  cargarProductos() {
    const url = `${api_productos}/products/all`;
    return this.http.get<Producto[]>(url);
  }

  addProduct(image: File, product: Producto) {
    console.log(image);

    const url = `${api_productos}/products`;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', product.name);
    formData.append('brand', product.brand);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('description', product.description);
    formData.append('state', product.state.toString());
    return this.http.post(url, formData);
  }
}
