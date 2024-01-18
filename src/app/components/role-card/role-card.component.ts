import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {JobService} from "../../service/job.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-role-card',
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.css'],
  imports: [MatCardModule, MatButtonModule],
  standalone: true
})
export class RoleCardComponent {
  @Input() jobId: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  isDisabled: boolean = false;
  buttonText: string = "Candidatar";

  constructor(
    private jobService: JobService,
    private notification: NotificationService
  ) {
  }

  onApplyCandidate(jobId: number): void {
    console.log("jobId", jobId)
    this.buttonText = "Enviando..."
    this.jobService.candidateApplication(jobId).subscribe(
      (response) => {
        console.log('Recurso atualizado com sucesso', response);
        this.isDisabled = true
        this.buttonText = "Enviado :)"
        this.notification.okMessage("Candidatura enviada com sucesso!")
      },
      (error) => {
        console.error('Erro ao atualizar vaga', error);
        let parsedError = JSON.parse(error.error);
        console.log(parsedError.message)
        this.buttonText = "Puxa, já enviada! Tente outra."
        this.notification.errorMessage(parsedError.message)

      }
    );
  }

}
