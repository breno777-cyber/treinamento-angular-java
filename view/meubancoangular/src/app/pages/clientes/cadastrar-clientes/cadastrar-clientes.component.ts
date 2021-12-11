import { ICliente } from './../../../interfaces/cliente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-clientes',
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})
export class CadastrarClientesComponent implements OnInit {
  form!: FormGroup
  id!: number;
  show: boolean = true;
  $sources!:ICliente
  constructor(private formb:FormBuilder, private clienteService: ClienteService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.creatForm();
    this.id = Number(this.router.snapshot.params['id']);
    if (this.id) {
      this.getById();
    }
  }

  creatForm(data?: ICliente): void {
    this.form = this.formb.group({

      nome: new FormControl(data? data.nome : null),
      email: new FormControl(data? data.email : null,[Validators.required, Validators.email]),
      cpf: new FormControl(data? data.cpf : null,[Validators.required]),
      observacoes: new FormControl(data? data.observacoes : null),
      ativo: new FormControl(data? data.ativo : null, [Validators.required]),
    })
  }

  onSubmit(): void {
    this.clienteService.cadastrar(this.form.getRawValue())
    .subscribe(
      (res) => {
      alert('Massa');
      this.form.reset();
    },
    (error) => {
      alert('Deu merda');
    });

  }


  getById(){
    this.clienteService.getById(this.id).subscribe(
      (res) =>{
        this.creatForm(res);
        this.$sources=res;
    },
    (error) =>{
      alert('deu merda');
    })
  }

  enviar(){
    const cliente: ICliente = this.form.value;
    console.log(cliente);
    this.clienteService.cadastrar(cliente).subscribe(clienteAPI => {
      console.log(cliente);
      Swal.fire(
        'Cadastro realizado!',
        'Cliente cadastrado com sucesso!',
        'success'
      );
    })
  }



}

