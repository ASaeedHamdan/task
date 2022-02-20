import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormGroup ,FormBuilder ,Validator, Validators} from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
MatDialogRef
FormGroup

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
   patientForm:FormGroup;
   actionBtn : string = "Save";
  constructor(
    private formBuilder:FormBuilder ,
     private ser :ApiService ,
     private dialogRef :MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData:any

     ) { }


  ngOnInit(): void {
    this.patientForm = this.formBuilder.group(
      {
        PatientName :['',Validators.required],
        PatientAge :['',Validators.required],
        PatientTelephone :['',Validators.required],
        PatientGender :['',Validators.required],
      //  PatientDate :['',Validators.required]
      }


    );
    if(this.editData){
      this.actionBtn = "Update";
      this.patientForm.controls['PatientName'].setValue(this.editData.PatientName);
      this.patientForm.controls['PatientAge'].setValue(this.editData.PatientAge);
      this.patientForm.controls['PatientTelephone'].setValue(this.editData.PatientTelephone);
      this.patientForm.controls['PatientGender'].setValue(this.editData.PatientGender);
     // this.patientForm.controls['PatientDate'].setValue(this.editData.PatientDate);
    }
    console.log(this.editData);
  }
  addPateint(){

    if(!this.editData){
      if(this.patientForm.valid){
        this.ser.postPatient(this.patientForm.value).subscribe(res=>{
          alert("patient added successfully");
          this.patientForm.reset();
          this.dialogRef.close("save");// close form after save data
        });
      }
    }else{
          this.updateData();
    }

  }

  updateData(){
    this.ser.updatePatient(this.patientForm.value , this.editData.id).subscribe({
      next:(res)=>{
        alert("patient updated successfully");
        this.patientForm.reset();
        this.dialogRef.close("update");// close form after update data
      },
      error:(err)=>{"error while updating data"}
    })
  }

}
