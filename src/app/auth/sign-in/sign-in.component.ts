import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { AuthModel } from 'src/app/types/AuthModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) { }

  // authDetails: AuthModel = {
  //   userLogin: "",
  //   userPassword: ""
  // };
  loginForm: FormGroup = this.formBuilder.group({
    userLogin: ["", Validators.required],
    userPassword: ["", Validators.required]

  });
  // message: string | undefined;
  // returnUrl: string | undefined;



  ngOnInit() {

    if (localStorage.getItem('authToken') === 'true') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/sign-in']);
    }

    this.loginForm = this.formBuilder.group({
      userLogin: [''],
      userPassword: ['']
    });
    // this.returnUrl = '/dashboard';
    // this.authService.signIn(this.authDetails);
  }

  // loginForm
  signIn() {
    const credentials = this.loginForm.value;

    this.authService.signIn(credentials).subscribe(
      (response) => {
        console.log('API Response:', response);

        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erro no login', error);


        this.notification.errorMessage("Login ou Senha errado, tente novamente.")
        console.error('Erro no login', error);
      }
    );

  }

  // enviarFormulario() {
  //   this.notificacao.notificar("Formulário enviado com sucesso");
  //   this.formContato.reset();
  // }

}
