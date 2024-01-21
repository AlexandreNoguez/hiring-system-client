import {Component, OnInit} from '@angular/core';
import {JobModel} from "../../types/JobTypes";
import {JobService} from "../../service/job.service";

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
  searchTerm: string = ""

  ngOnInit() {
    this.onGetAllJobs();
    // console.log("jobs", this.jobs)

  }
  onGetAllJobs(): void {
    this.jobService.getAllJobs("").subscribe(
      (response: any) => {
        // console.log("response", response)
        this.jobs = response?.elements || [];
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  filteredJob(searchTerm: string) {
    // console.log("teste", searchTerm);

    this.jobs.filter(job => {
      return job.title === searchTerm
    })
  }

  onApplyCandidate(): void {


  }

}
