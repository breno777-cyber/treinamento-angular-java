import { IConta } from './../../../interfaces/contas';
import { ICliente } from './../../../interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContasComponent } from './../contas.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';
import { multicast } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-contas',
  templateUrl: './cadastrar-contas.component.html',
  styleUrls: ['./cadastrar-contas.component.css']
})
export class CadastrarContasComponent implements OnInit {
  form!: FormGroup
  @Input() dataSource!:ICliente;
  router: any;

  constructor(private formb:FormBuilder, private contaService:ContasService, private clienteService:ClienteService, router: Router) { }

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

  //puxa o id do cliente para editar
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

  //cadastra conta do cliente puxando pelo metodo acima
  save():void {
    this.contaService.save(this.mountPayLoad()).subscribe((res) =>{
      Swal.fire("Conta cadastrada!", "Conta cadastrada com sucesso!","success");
      this.router.navigate(['/contas']);
  },(error) =>{
    console.log(error)
    });
  }


}
