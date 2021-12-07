import { ICliente } from './../../interfaces/cliente';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: ICliente[] = [];


  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarTodosClientes();
  }

  listarTodosClientes(){
    this.clienteService.listarTodosClientes().subscribe(clientesApi => {
      this.clientes = clientesApi
    });

  }

  deletar(id: number) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: "a remoção dessa conta será permanente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Deletar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe(clientesApi => {
          Swal.fire(
            'Deletado',
            'Cliente deletado com sucesso',
            'success'
          );
          this.listarTodosClientes()
        }, error => {
          console.error(error)
        })

      }
    })
  }

}
