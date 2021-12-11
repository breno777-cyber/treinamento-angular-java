import { IConta } from './../../../interfaces/contas';
import { ICliente } from './../../../interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContasComponent } from './../contas.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';
import { multicast } from 'rxjs';

@Component({
  selector: 'app-cadastrar-contas',
  templateUrl: './cadastrar-contas.component.html',
  styleUrls: ['./cadastrar-contas.component.css']
})
export class CadastrarContasComponent implements OnInit {
  form!: FormGroup
  @Input() dataSource!:ICliente;

  constructor(private formb:FormBuilder, private contaService:ContasService, private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.creatForm();
    console.log(this.dataSource);
  }

  creatForm():void{
    this.form = this.formb.group({
      agencia: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      saldo: new FormControl('', Validators.required),
    })
  }
  mountPayLoad():IConta {
    const data = this.form.value
    console.log(data);
    const payLoad: IConta = {
      agencia: data.agencia,
      saldo: data.saldo,
      numero: data.numero,
      cliente: this.dataSource
    }
    return payLoad
  }
  save():void {

  }


}
