import { ContasService } from './../../services/contas.service';
import { ClienteService } from './../../services/cliente.service';
import { IConta } from './../../interfaces/contas';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  contas:any [] = [];

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
    this.listarTodasContas();
  }

  //metodo pra listar todas as contas
  listarTodasContas(){
    this.contasService.listarTodasContas().subscribe(contasApi => {
      this.contas = contasApi

    })
  }

  onSubmit(): void{

  }

}
