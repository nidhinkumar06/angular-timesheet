import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { userNames, workFrom, projectsList, projectPhase } from '../add/add.mockdata';
import { Data } from '../../../app.storage';
import { TimeSheet } from '../timesheet.model';
import { TimeSheetService } from '../timesheet.service';
import * as moment from 'moment';


@Component({
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  names = userNames;
  workFrom = workFrom;
  projects = projectsList;
  phases = projectPhase;
  id = '';
  rowData;

  heroForm: FormGroup;
  submitted = false;
  buttonDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private data: Data,
    private timeSheetService: TimeSheetService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.data =  this.data.storage;
    this.heroForm = this.formBuilder.group({
      name: [this.data['Name'], Validators.required],
      workfrom: [this.data['Workfrom'], Validators.required],
      project: [this.data['Project'], Validators.required],
      phase: [this.data['Phase'], Validators.required],
      task: [this.data['Task'], Validators.required],
      hrs: [this.data['hrs'], Validators.required],
      comments: [this.data['comments']]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.buttonDisabled = true;

    // stop here if form is invalid
    if (this.heroForm.invalid) {
      return;
    }
    this.updateDataToFirebase(this.heroForm.value);
  }
  updateDataToFirebase(values: any) {
    const firebaseId = parseInt(this.id, 10);
    const data: TimeSheet = {
      id: firebaseId,
      Name: values.name,
      Phase: values.phase,
      Project: values.project,
      Task: values.task,
      Timestamp: this.data['Timestamp'],
      Workfrom: values.workfrom,
      comments: values.comments,
      hrs: moment.duration(values.hrs).asSeconds().toString()
    };
    setTimeout(() => {
      this.timeSheetService.updateTimeSheet(this.id, data);
      this.submitted = false;
      this.buttonDisabled = false;
      this.router.navigateByUrl('/timesheet');
    }, 2000);
  }

}
