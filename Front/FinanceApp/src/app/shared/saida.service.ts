import { Injectable } from '@angular/core';
import { Saida } from './saida';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SaidaService {

  constructor(private http: HttpClient) { }

  readonly baseURL = "https://localhost:5001/api/Extratoes";
  formData: Saida = new Saida();
  list: Saida[];

  postSaida() {
    return this.http.post(this.baseURL, this.formData);
  }

  putSaida() {
    return this.http.put(`${this.baseURL}/${this.formData.ID}`, this.formData);
  }

  deleteSaida(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>{this.list = res as Saida[]

      });
    }
}
