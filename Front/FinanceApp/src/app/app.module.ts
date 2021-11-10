import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { CaixaComponent } from './caixa/caixa.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { EntradaComponent } from './entrada/entrada.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SaidaComponent } from './saida/saida.component';


@NgModule({
  declarations: [
    AppComponent,
    CaixaComponent,
    ExtratoComponent,
    EntradaComponent,
    NavbarComponent,
    SaidaComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
