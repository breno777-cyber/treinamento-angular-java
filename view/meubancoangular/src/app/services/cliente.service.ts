import { ICliente } from './../interfaces/cliente';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  api = `${environment.api}/clientes/`;
  constructor(private http: HttpClient) { }

  listarTodosClientes(){
    return this.http.get<ICliente[]>(this.api);
  }
  // cadastrar(body: ICliente): Observable<any>{
  //   return this.http.post<ICliente>(this.api, body)
  // }

  deleteCliente(id: number) {
    return this.http.delete(`${this.api}/${id}`)
  }

  getById(id: number): Observable<any>{
    return this.http.get(`${this.api}/${id}`);
  }

  cadastro(cliente: ICliente): Observable<any>{
    return this.http.post<ICliente>(this.api, cliente);
  }

  putClient(id: number, body: ICliente){
    return this.http.put(`${this.api}${id}`, body)
  }

  postClient(body: ICliente): Observable<any>{
    return this.http.post(`${this.api}`, body);
  }

}
