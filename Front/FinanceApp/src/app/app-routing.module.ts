import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaixaComponent } from './caixa/caixa.component';
import { EntradaComponent } from './entrada/entrada.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { SaidaComponent } from './saida/saida.component';

const routes: Routes = [
  { path: 'Saida', component: SaidaComponent },
  { path: 'Entrada', component: EntradaComponent },
  { path: 'Extrato', component: ExtratoComponent },
  { path: 'Caixa', component: CaixaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
