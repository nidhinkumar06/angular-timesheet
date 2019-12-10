import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeSheetService } from '../timesheet.service';
import { TimeSheet } from '../timesheet.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { userNames, workFrom, projectsList, projectPhase } from './add.mockdata';

@Component({
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {

  names = userNames;
  workFrom = workFrom;
  projects = projectsList;
  phases = projectPhase;

  heroForm: FormGroup;
  submitted = false;
  buttonDisabled = false;


  constructor(private formBuilder: FormBuilder, private timeSheetService: TimeSheetService, private router: Router) { }

  ngOnInit() {
    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      workfrom: ['', Validators.required],
      project: ['', Validators.required],
      phase: ['', Validators.required],
      task: ['', Validators.required],
      hrs: ['', Validators.required],
      comments: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    this.buttonDisabled = true;

    // stop here if form is invalid
    if (this.heroForm.invalid) {
      return;
    }
    this.saveDataToFirebase(this.heroForm.value);
    console.log('on submit got called', this.heroForm.value);
  }

  saveDataToFirebase(values: any) {
    const data: TimeSheet = {
      id: 999,
      Name: values.name,
      Phase: values.phase,
      Project: values.project,
      Task: values.task,
      Timestamp: moment.utc().local().format('YYYY-MM-DDTHH:mm:ss.SSS'),
      Workfrom: values.workfrom,
      comments: values.comments,
      hrs: moment.duration(values.hrs).asSeconds().toString()
    };
    setTimeout(() => {
      this.timeSheetService.addTimeSheet(data);
      this.submitted = false;
      this.buttonDisabled = false;
      this.router.navigateByUrl('/timesheet');
    }, 2000);
  }

}
