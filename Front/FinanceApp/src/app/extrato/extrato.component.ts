import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtratoService } from '../shared/extrato.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Extrato } from '../shared/extrato';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css'],
})
export class ExtratoComponent implements OnInit {
  constructor(
    public service: ExtratoService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  private _botao: string = '';
  private _filtroLista: string = '';

  public get botao(): string {
    return this._botao;
  }
  public set botao(value: string) {
    this._botao = value;
  }
  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.service.list = this.filtroLista
      ? this.filtrar(this.filtroLista)
      : this._filtroLista;
  }

  filtrar(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.service.list.filter(
      (pesquisaa: {
        descricao: string;
        data: Date;
        valor: number;
        parcela: number;
      }) =>
        pesquisaa.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        pesquisaa.data.toString().indexOf(filtrarPor) !== -1 ||
        pesquisaa.valor.toString().indexOf(filtrarPor) !== -1 ||
        pesquisaa.parcela.toString().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Extrato) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Deseja apagar?')) {
      this.service.deleteExtrato(id).subscribe(
        (res) => {
          this.service.refreshList();
          this.toastr.error('Apagado com Sucesso', 'Deleted successfully');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0) this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postExtrato().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Adicionado com Sucesso', 'Submitted successfully');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putExtrato().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Atualizado com Sucesso', 'Uptated Successfully');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Extrato();
  }
}
