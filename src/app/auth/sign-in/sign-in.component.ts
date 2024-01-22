import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/service/auth.service';
import {NotificationService} from 'src/app/service/notification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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

  loginForm: FormGroup = this.formBuilder.group({
    userLogin: ["", Validators.required],
    userPassword: ["", Validators.required]
  });
  isButtonDisabled = false;
  buttonText = "Entrar"

  async ngOnInit() {
    let token = await this.authService.decodePayloadJWT()
    if (token) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['auth/sign-in']);
    }

    this.loginForm = this.formBuilder.group({
      userLogin: [''],
      userPassword: ['']
    });
  }

  onSignIn() {
    this.isButtonDisabled = true;
    this.buttonText = "Carregando..."
    const credentials = this.loginForm.value;

    this.authService.signIn(credentials).subscribe(
      () => {

        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erro no login', error);
        this.isButtonDisabled = false;
        this.buttonText = "Entrar"
        this.notification.errorMessage("Login ou Senha errado, tente novamente.")
        console.error('Erro no login', error);
      }
    );

  }



}
