import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {
  form!: FormGroup
  constructor(private formb:FormBuilder) { }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm(): void {
    this.form = this.formb.group({
      Agencia: new FormControl(null,[Validators.required, Validators.maxLength(6)]),
      Conta: new FormControl(null,[Validators.required, Validators.maxLength(6)],),
      Valor: new FormControl(null,[Validators.required],),
    })
  }

  onSubmit(): void{
    console.log(this.form.value)
  }

}
