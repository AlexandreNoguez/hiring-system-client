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
export class SignUpComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private skillService: SkillService,
    private notification: NotificationService
  ) { }
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
    userPassword: ["", Validators.required],
    matchUserPassword: ["", Validators.required],
    userEmail: ["", Validators.required],
    skills: ["", Validators.required],
    roles: [[], Validators.required]
  });

  addSkill() {
    this.selectedSkills.push(this.selected)
    this.selected = {skillId: null, title: ''}
    console.log("signUpForm", this.signUpForm)
    console.log("skills", this.skills)
    console.log("role", this.role)
  }

  async onSignUp():Promise<void> {
    this.isButtonDisabled = true;
    this.buttonText = "Carregando..."

    let userDetails = this.signUpForm.value;

    let listOfSkills = this.selectedSkills;

    userDetails.skills = listOfSkills

    userDetails.roles.push(this.role)


    await this.authService.signUp(userDetails).subscribe(
      (response: any) => {
        this.notification.errorMessage("Cadastro realizado com sucesso, você já pode logar!")
        this.isButtonDisabled = true;
        this.buttonText = "Enviar"
        return this.router.navigate(['/auth/sign-in']);
      },
      (error) => {
        this.isButtonDisabled = false;
        this.buttonText = "Enviar"
        this.notification.errorMessage("Verifique todos os campos e tente novamente.")
      }
    );

  }

  onGetAllSkills() {
    this.skillService.getAllSkills().subscribe(
      skills => {
        this.skills = skills;
      },
      error => {
        console.error("Error fetching skills:", error);
        // Handle errors, show error message, etc.
      }
    );
  }
}
