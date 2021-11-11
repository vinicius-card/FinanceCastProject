import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Extrato } from './extrato';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {
  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:5001/api/Extratoes';
  formData: Extrato = new Extrato();
  list: Extrato[];

  postExtrato() {
    return this.http.post(this.baseURL, this.formData);
  }

  putExtrato() {
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }

  deleteExtrato(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then((res) => {
        this.list = res as Extrato[];
      });
  }
}
