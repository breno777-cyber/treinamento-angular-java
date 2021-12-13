import { ITransferencia } from './../interfaces/transferencia';
import { Observable } from 'rxjs';
import { ISaqueDeposito } from './../interfaces/saque-deposito';
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
  saque(saque: ISaqueDeposito): Observable<any> {
    return this.http.post<IConta>(`${this.api}saque`, saque);
  }
  deposito(deposito: ISaqueDeposito) {
    return this.http.post<IConta>(`${this.api}deposito`, deposito)
  }

  transferencia(transferencia: ITransferencia) {
    return this.http.post<IConta>(`${this.api}transferencia`, transferencia);
  }

  save(dados: IConta):Observable<any>{
    return this.http.post<IConta>(`${this.api}`, dados);
  }

}
