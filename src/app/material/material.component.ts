import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  displayedColumns: string[] = [ 'id','PatientName', 'PatientAge', 'PatientTelephone', 'PatientGender','action' ,'Appointment'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private dialog:MatDialog,private ser :ApiService , private route:Router ) { }


  ngOnInit(): void
  {
    this.getallPateints();
  }

  /* get all patients */
    getallPateints(){
    this.ser.getdata().subscribe(
        {
          next:(res)=>
          {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

          },
          error:(err)=>{"error while getting data"},
        }

    )
  }
/* show pateint data row by Mat_Data_Dialog used in diaolg component */
    editPatient(row){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val === "update"){
            this.getallPateints();
        }
      })
    }



/* delete patient */
deletePatient(id:Number){
  this.ser.deletePatient(id).subscribe({
    next:(res)=>{
      alert("patient deleted successfully");
      this.getallPateints();

    },
    error:(err)=>{"error while deleting data"}
  })
}

openAppointment(){
this.route.navigate(['/appointmentPage']);
}


   /*open dialog to add new patient  */
    openDialog() {
      this.dialog.open(DialogComponent, {
      width:'30%'
      }).afterClosed().subscribe(val=>{
        if(val === "save"){
            this.getallPateints();
        }
      })
    }

    openApoointDialog(){
      this.dialog.open(AppointmentDialogComponent ,{
        width:'30%',

      })
    }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
