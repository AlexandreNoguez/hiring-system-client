import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobModel} from "../../types/JobTypes";
import {JobService} from "../../service/job.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private jobService: JobService
  ) {
    this.onGetAllJobs();

  }
  jobs: JobModel[] = []
  userSearch: string = ""

  ngOnInit() {
    this.onGetAllJobs();
    console.log("jobs",this.jobs)

  }
  onGetAllJobs(): void {
    this.jobService.getAllJobs("").subscribe(
      (response: any) => {
        console.log("response", response)
        this.jobs = response?.elements || [];
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  onApplyCandidate(): void {


  }

}
