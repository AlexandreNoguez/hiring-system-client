import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SkillService} from "../../service/skill.service";
import {NotificationService} from "../../service/notification.service";
import {Skill} from "../../types/SkillTypes";
import {JobService} from "../../service/job.service";

@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.css']
})
export class CreateJobsComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillService,
    private jobService: JobService,
    private notification: NotificationService,
  ) {
  }
  skills: Skill[] = [];
  isButtonDisabled = false;
  buttonText = "Enviar";
  create: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  selectedSkills: string[] = [];
  selected: string = "";

  async ngOnInit() {
    await this.onGetAllSkills();
  }


  jobForm: FormGroup = this.formBuilder.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    requirements: ["", Validators.required],
    status: "OPEN"
  });

  addSkill() {
    this.selectedSkills.push(this.selected)
    this.selected = ''
  }

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

  onCreateNewJob() {
    this.isButtonDisabled = true;
    this.buttonText = "Carregando..."
    let job = this.jobForm.value;

    let stringfyRequirements = JSON.stringify(this.selectedSkills);
    job.requirements = stringfyRequirements

    this.jobService.createNewJob(job).subscribe(
      (response) => {
        this.notification.okMessage("Vaga cadastrada com sucesso.")
        this.isButtonDisabled = false
        this.buttonText = "Enviar"
        job = ""
      },
      (error) => {

        let parsedError;

        try {
          parsedError = JSON.parse(error.error);
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
          this.notification.errorMessage("Erro ao analisar a resposta do servidor.");
          this.isButtonDisabled = false
          this.buttonText = "Enviar"
          return;
        }

        if (parsedError) {
          if (parsedError.message) {
            this.notification.errorMessage(parsedError.message);
            this.isButtonDisabled = false
            this.buttonText = "Enviar"
          } else if (Array.isArray(parsedError.errors) && parsedError.errors.length > 0) {
            let replacedError = parsedError.errors[0].replace("title:", "");
            this.notification.errorMessage(replacedError);
            this.isButtonDisabled = false
            this.buttonText = "Enviar"
          }
        }
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
      }
    );
  }
}
