import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/service/auth.service';
import {NotificationService} from 'src/app/service/notification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Skill} from "../../types/SkillTypes";
import {SkillService} from "../../service/skill.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private skillService: SkillService,
    private notification: NotificationService
  ) {
  }

  skills: Skill[] = [];
  isButtonDisabled = false;
  buttonText = "Enviar";
  create: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  selectedSkills: Skill[] = [];
  selected: Skill = {skillId: null, title: ""};
  role: string = ""

  async ngOnInit() {
    await this.onGetAllSkills();

  }

  signUpForm: FormGroup = this.formBuilder.group({
    userLogin: ["", Validators.required],
    userName: ["", Validators.required],
    userPassword: ["", [
      Validators.required,
      Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$")
    ]],
    matchUserPassword: ["", Validators.required],
    userEmail: ["", Validators.required],
    skills: ["", Validators.required],
    roles: [[], Validators.required]
  });

  addSkill() {
    // let userDetails = this.signUpForm.value;

    // console.log("userDetails", userDetails)

    if (this.selected.title === "") {
      return this.notification.errorMessage("Antes de adicionar, selecione uma habilidade da lista.")
    }

    if (this.selectedSkills.includes(this.selected)) {
      return this.notification.errorMessage("Esta habilidade já está na sua lista! Escolha outras.")
    }

    this.selectedSkills.push(this.selected)
    this.selected = {skillId: null, title: ''}


  }

  onSignUp(): void {
    this.isButtonDisabled = true;
    this.buttonText = "Carregando..."

    let userDetails = this.signUpForm.value;

    let listOfSkills = this.selectedSkills;

    userDetails.skills = listOfSkills

    if (this.role) {
      userDetails.roles.push(this.role)
    }

    if (userDetails.userPassword !== userDetails.matchUserPassword) {
      this.isButtonDisabled = false;
      this.buttonText = "Enviar"

      return this.notification.errorMessage("As senhas precisa ser idênticas.")
    }
    console.log("roles", userDetails.roles)
    if (!userDetails.roles.length) {
      this.isButtonDisabled = false;
      this.buttonText = "Enviar"
      return this.notification.errorMessage("Selecione um tipo de usuário para utilizar a plataforma.")
    }

    this.authService.signUp(userDetails).subscribe(
      (response: any) => {
        this.notification.errorMessage("Cadastro realizado com sucesso, você já pode logar!")
        this.isButtonDisabled = true;
        this.buttonText = "Enviar"
        return this.router.navigate(['/auth/sign-in']);
      },
      (error) => {
        this.isButtonDisabled = false;
        this.buttonText = "Enviar"
        let parsedError = JSON.parse(error.error);

        // console.log(parsedError)

        if (!parsedError.errors) {
          return this.notification.errorMessage(parsedError.message)
        }

        parsedError.errors.forEach((error: string) => {

          let errorMsg = error.split(' ');

          errorMsg.shift();

          let newErrorMsg = errorMsg.join();

          let formattedPhrase = newErrorMsg.replaceAll(",", " ")

          this.notification.errorMessage(formattedPhrase)
        })

      }
    );

  }

  onGetAllSkills() {
    this.skillService.getAllSkills().subscribe(
      skills => {
        this.skills = skills;
      },
      error => {
        console.error("Erro ao carregar habilidades:", error);

      }
    );
  }
}
