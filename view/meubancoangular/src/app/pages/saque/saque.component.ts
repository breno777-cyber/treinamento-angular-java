import { ContasService } from './../../services/contas.service';
import { ISaqueDeposito } from './../../interfaces/saque-deposito';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {
  form!: FormGroup
  constructor(private formb:FormBuilder, private contaService: ContasService, private router: Router) { }

  ngOnInit(): void {
    this.creatForm(); /**creando o formulário */
  }

  creatForm(): void { /**preenchendo o formulário */
    this.form = this.formb.group({
      agencia: new FormControl('',[Validators.required]),
      numeroConta: new FormControl('',[Validators.required],),
      valor: new FormControl('',[Validators.required],),
    })
  }

  onSubmit(): void{
    console.log(this.form.value)

    this.form.reset();
  }

  sacar(){
    const saque: ISaqueDeposito = this.form.value;
    console.log(saque);
    this.contaService.saque(saque).subscribe(contaApi => {
      Swal.fire({
        icon: 'success',
        title: 'Transação realizada!',
        text: 'Saque efetuado!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/contas']);
    }, error => {
      console.error(error)
    });


  }
  }


