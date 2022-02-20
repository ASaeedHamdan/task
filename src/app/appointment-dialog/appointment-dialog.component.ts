import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormGroup ,FormBuilder ,Validator, Validators} from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {
  AppointForm:FormGroup;
  actionBtn : string = "Save";
  constructor(
    private formBuilder:FormBuilder ,
    private ser :ApiService ,
    private dialogRef :MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public GettinData:any
   ) {

  }

  ngOnInit(): void {

    this.AppointForm = this.formBuilder.group(
      {
        PatientName :['',Validators.required],
        PatientAge :['',Validators.required],
        PatientTelephone :['',Validators.required],
        AppointmentDate :['',Validators.required],
        DetectionType :['',Validators.required],
      }


    );

    if(this.GettinData){
      this.actionBtn = "Update";
      this.AppointForm.controls['PatientName'].setValue(this.GettinData.PatientName);
      this.AppointForm.controls['PatientAge'].setValue(this.GettinData.PatientAge);
      this.AppointForm.controls['PatientTelephone'].setValue(this.GettinData.PatientTelephone);
      this.AppointForm.controls['AppointmentDate'].setValue(this.GettinData.AppointmentDate);
      this.AppointForm.controls['DetectionType'].setValue(this.GettinData.DetectionType);
    }
    console.log(this.GettinData);
  }


  addAppointment(){
    if(!this.GettinData){
      if(this.AppointForm.valid){
      this.ser.postAppointment(this.AppointForm.value).subscribe(res=>{
        alert("appointment added successfully");
        this.AppointForm.reset();
        this.dialogRef.close("save");// close form after save data
      });
    }}else
    {
      this.updateData();
     }
  }


  updateData(){
    this.ser.updateAppointment(this.AppointForm.value , this.GettinData.id).subscribe({
      next:(res)=>{
        alert("patient updated successfully");
        this.AppointForm.reset();
        this.dialogRef.close("update");// close form after update data
      },
      error:(err)=>{"error while updating data"}
    })
  }


}
