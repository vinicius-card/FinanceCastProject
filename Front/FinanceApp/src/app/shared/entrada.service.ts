import { Injectable } from '@angular/core';
import { Entrada } from './entrada';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'https://localhost:5001/api/Extratoes';
  formData: Entrada = new Entrada();
  list: Entrada[];

  postEntrada() {
    return this.http.post(this.baseURL, this.formData);
  }

  putEntrada() {
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }

  deleteEntrada(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then((res) => {
        this.list = res as Entrada[];
      });
  }
}
