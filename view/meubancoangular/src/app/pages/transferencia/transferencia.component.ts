import { ContasService } from './../../services/contas.service';
import { ITransferencia } from './../../interfaces/transferencia';
import { ClienteService } from './../../services/cliente.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  form!: FormGroup
  constructor(private formb: FormBuilder, private contaService: ContasService, private router: Router) { }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm(){
    this.form = this.formb.group({

      agenciaDestino: new FormControl('', Validators.required),
      agenciaOrigem: new FormControl('', Validators.required),
      numeroContaDestino: new FormControl('', Validators.required),
      numeroContaOrigem: new FormControl('', Validators.required),
      valor: new FormControl(null, Validators.required)
    })
  }

  transferencia(){
    const transferencia: ITransferencia = this.form.value;
    this.contaService.transferencia(transferencia).subscribe(clienteApi =>{
      Swal.fire("Transação realizada!", "Transferência efetuada com sucesso!","success")
    console.log(clienteApi)
    this.router.navigate(['/contas'])
  },error =>{
    console.log(error)
    })
  }
}
