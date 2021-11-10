import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Extrato } from './extrato';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  constructor(private http: HttpClient) { }

  formData: Extrato = new Extrato();
  readonly baseURL = 'https://localhost:5001/api/Extratoes';
  list: Extrato[];

  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then((res) => {
        this.list = res as Extrato[];
      });
  }
}
