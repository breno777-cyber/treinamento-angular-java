import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cadastrar-clientes',
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})
export class CadastrarClientesComponent implements OnInit {
  form!: FormGroup
  constructor(private formb:FormBuilder) {}

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm(): void {
    this.form = this.formb.group({

      nome: new FormControl(null),
      email: new FormControl(null,[Validators.required, Validators.email]),
      cpf: new FormControl(null,[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
      observacoes: new FormControl(null),
      ativo: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit(): void {
    alert(`nome: ${this.form?.get('nome')?.value}\ncpf: ${this.form?.get('cpf')?.value}\nemail: ${this.form?.get('email')?.value}\nobservacoes: ${this.form?.get('observacoes')?.value}\nativo: ${this.form?.get('ativo')?.value}`)
    this.form.reset();

  }




}

