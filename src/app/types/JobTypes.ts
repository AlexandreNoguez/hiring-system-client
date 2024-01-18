export interface JobList{
  job: JobModel[]
}


export interface JobModel {
  jobId: number;
  title: string;
  description: string;
  requirements: string;
}
