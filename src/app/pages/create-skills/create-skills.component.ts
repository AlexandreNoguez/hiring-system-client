import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {SkillService} from "../../service/skill.service";

@Component({
  selector: 'app-create-skills',
  templateUrl: './create-skills.component.html',
  styleUrls: ['./create-skills.component.css']
})
export class CreateSkillsComponent {
  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillService,
    private notification: NotificationService
  ) {
  }


  skillForm: FormGroup = this.formBuilder.group({
    title: ["", Validators.required]

  });

  isButtonDisabled = false;
  buttonText = "Enviar";
  create: boolean = false;
  edit: boolean = false;
  delete: boolean = false;

  onCreateView() {
    this.create = true
    this.edit = false
    this.delete = false
  }

  onEditView() {
    this.create = false
    this.edit = true
    this.delete = false
  }

  onDeleteView() {
    this.create = false
    this.edit = false
    this.delete = true
  }

  onCreateNewSkill() {
    this.isButtonDisabled = true;
    this.buttonText = "Carregando..."
    let skill = this.skillForm.value;
    console.log(skill)
    this.skillService.createNewSkill(skill).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.notification.okMessage("Skill cadastrada com sucesso.")
        this.isButtonDisabled = false
        this.buttonText = "Enviar"
        skill = ""
      },
      (error) => {
        let parsedError;

        try {
          parsedError = JSON.parse(error.error);
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
          this.notification.errorMessage("Erro ao analisar a resposta do servidor.");
          this.isButtonDisabled = false
          return;
        }

        if (parsedError) {
          if (parsedError.message) {
            this.notification.errorMessage(parsedError.message);
            this.isButtonDisabled = false
          } else if (Array.isArray(parsedError.errors) && parsedError.errors.length > 0) {
            let replacedError = parsedError.errors[0].replace("title:", "");
            this.notification.errorMessage(replacedError);
            this.isButtonDisabled = false
          }
        }

      }
    );
  }

  onEdit(){

  }


}
