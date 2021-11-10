import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtratoService } from '../shared/extrato.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Extrato } from '../shared/extrato';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {
  constructor(public service: ExtratoService,
    private toastr: ToastrService, private http: HttpClient) {}

  private _filtroLista: string = '';


  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.service = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.service;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.service.list.filter((entrada: { data: string}) =>
      entrada.data.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit(): void {
    this.getEntrada;
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Extrato();
  }

  public getEntrada(): void {
    this.http.get('https://localhost:5001/api/Extratoes').subscribe(
      (x) => {
        (x = x),(x = this.service = this.service);
      },
      (error) => console.log(error)
    );
  }
}
