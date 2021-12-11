import  Swal  from 'sweetalert2';
import { ContasService } from './../../services/contas.service';
import { ISaqueDeposito } from './../../interfaces/saque-deposito';
import { FormBuilder, FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {
  form!: FormGroup
  constructor(private formb:FormBuilder, private contaService: ContasService, private router: Router) { }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm(): void {
    this.form = this.formb.group({
      agencia: new FormControl(null,[Validators.required]),
      numeroConta: new FormControl(null,[Validators.required],),
      valor: new FormControl(null,[Validators.required],),
    })
  }

  onSubmit(): void{
    console.log(this.form.value)

    this.form.reset();
  }

  deposito(){
    const deposito : ISaqueDeposito = this.form.value;
    console.log(deposito);
    this.contaService.deposito(deposito).subscribe(contaApi =>{
      Swal.fire({
        icon: 'success',
        title: 'Transação realizada!',
        text: 'Depósito efetuado!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/contas']);
    })
  }

}
