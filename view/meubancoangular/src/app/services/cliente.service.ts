import { ICliente } from './../interfaces/cliente';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  api = `${environment.api}/clientes/`;
  constructor(private http: HttpClient) { }

  listarTodosClientes(){
    return this.http.get<ICliente[]>(this.api);
  }
  cadastrar(cliente: ICliente){
    return this.http.post<ICliente>(this.api, cliente)
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
