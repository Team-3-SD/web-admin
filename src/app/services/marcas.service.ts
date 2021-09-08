import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Marcas } from '../models/marca.models';

const api_productos = environment.api_productos;

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  constructor(private http: HttpClient) {}

  cargarMarcas() {
    const url = `${api_productos}/brands/`;
    return this.http.get<Marcas[]>(url);
  }

  cargarMarca(id: number) {
    const url = `${api_productos}/brands/${id}`;
    return this.http.get<Marcas>(url);
  }

  addMarca(marca: Marcas) {
    const url = `${api_productos}/brands/`;
    return this.http.post(url, marca);
  }
}
