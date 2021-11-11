import { Caixa } from './caixa';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  formData: Caixa= new Caixa();
  readonly baseURL = 'https://localhost:5001/api/Caixas';
  list: Caixa[];

  constructor(private http: HttpClient) { }

  postCaixa(){
    return this.http.post(this.baseURL, this.formData)
  }
  putCaixa(){
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }
  deleteCaixa(){
    return this.http.delete(`${this.baseURL}/${this.formData.id}`);
  }
  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>{this.list = res as Caixa[]

      });
  }
}
