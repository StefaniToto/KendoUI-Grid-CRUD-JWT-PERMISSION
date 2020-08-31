import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { FieldArrayType } from '@ngx-formly/core';
import { Product } from './model';
import { ToasterService } from 'angular2-toaster';
import { ExamService } from '../../services/examService/exam.service';

const createFormGroup = dataItem => new FormGroup({
  'Name': new FormControl(dataItem.Name),
  'Surname': new FormControl(dataItem.Surname, Validators.required),
  'Email': new FormControl(dataItem.Email),
  'RoleId': new FormControl(
    dataItem.RoleId,
    Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),

});


@Component({
  selector: 'app-dynamic-datatable-form',
  templateUrl: './kendo-datatable-form.component.html'
})

export class KendoDatatableFormComponent extends FieldArrayType implements OnInit {

  gridData: any;
  public columns: any[] = [
    { field: 'Name', title: 'Name' },
    { field: 'Surname', title: 'Surname' },
    { field: 'Email', title: 'E-mail' },
    { field: 'RoleId', title: 'Role' }];


  public data: Array<any>;

  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public formGroup: FormGroup;
  private editedRowIndex: number;


  constructor(
    private service: ExamService,
    private toasterService: ToasterService
  ) {
    super();
    this.getData();
  }


  public ngOnInit(): void {

  }


  getData() {
    this.service.getData().subscribe(
      result => {
        this.gridData = result
        this.toasterService.pop('success', 'Data loaded', '')
      },
      error => this.toasterService.pop('error', 'Error', '')
    )
  }

  deleteRow(params) {
    console.log();
    this.service.deleteData(params.dataItem.id).subscribe(
      (data) => {
        this.gridData = this.gridData.filter(data => data.id !== params.dataItem.id)
        this.toasterService.pop('success', 'Row deleted', '')

      },
      error => this.toasterService.pop('error', 'Error', '')
    );
  }

  addData(params) {
//add data to current json object
    const body = {
      Name: params.Name,
      Surname: params.Surname,
      Email: params.Email,
      RoleId: params.RoleId
    }
    this.service.addPost(body).subscribe(
      (res) => {
        this.gridData.push(res)
        this.gridData = this.gridData.slice();
        this.toasterService.pop('success', 'Data added', '')
      },
      error => this.toasterService.pop('error', 'Error', '')
    );
  }

  editDatainService(params, rowIndex) {
    //edit data to current json object
    const idrow = params.id;
    const body = {
      id: rowIndex + 1,
      Name: params.Name,
      Surname: params.Surname,
      Email: params.Email,
      RoleId: params.RoleId
    }
    this.service.updatePost(body).subscribe(
      (data) => {
        this.gridData[rowIndex] = data,
          this.gridData = this.gridData.slice()
      },
      error =>  this.toasterService.pop('success', 'Row deleted', '')
    );
  }

   newData({ sender }) {

    this.formGroup = createFormGroup({
      'Name': "",
      'Surname': "",
      'Email': "",
      'RoleId': ""
    });
    sender.addRow(this.formGroup);
  }

   closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

   editData({ sender, rowIndex, dataItem }) {
    //editRow
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'Name': new FormControl(dataItem.Name),
      'Surname': new FormControl(dataItem.Surname, Validators.required),
      'Email': new FormControl(dataItem.Email),
      'RoleId': new FormControl(
        dataItem.RoleId,
        Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
    });
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

   cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

   saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const product: Product = formGroup.value;

    if (formGroup.valid && isNew) {
      this.addData(product);
    }
    else if (formGroup.valid) {
      this.editDatainService(product, rowIndex)
    }
    sender.closeRow(rowIndex);
  }

   onStateChange(state: State) {
    this.gridState = state;
  }

}
