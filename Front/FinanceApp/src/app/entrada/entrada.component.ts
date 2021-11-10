import { Component, OnInit } from '@angular/core';
import { EntradaService } from 'src/app/shared/entrada.service';
import { Entrada } from 'src/app/shared/entrada';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: [],
})
export class EntradaComponent implements OnInit {
  constructor(public service: EntradaService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Entrada) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEntrada(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'Payment Detail Register');
          },
          err => { console.log(err) }
        )
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0) this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postEntrada().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success(
          'Submitted successfully',
          'Payment Detail Register'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putEntrada().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Atualizado com Sucesso', 'Saida Refistrada');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Entrada();
  }
}
