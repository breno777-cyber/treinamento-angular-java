import { IConta } from './../interfaces/contas';
import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContasService {

  api = `${environment.api}/contas/`;
  constructor(private http: HttpClient) {}

  listarTodasContas(){
    return this.http.get<IConta[]>(this.api);

  }
}
