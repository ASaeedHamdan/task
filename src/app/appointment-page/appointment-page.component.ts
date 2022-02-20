import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.css']
})
export class AppointmentPageComponent implements OnInit {
  displayedColumns: string[] = [ 'id','PatientName', 'PatientAge', 'PatientTelephone', 'AppointmentDate','DetectionType','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog:MatDialog,private ser :ApiService ) { }

  ngOnInit(): void {
    this.getallAppointments();
    console.log(this.getallAppointments);

  }

/* get all appointments */
getallAppointments(){
  this.ser.getAppointments().subscribe(
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


editApoint(row){
  this.dialog.open(AppointmentDialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val === "update"){
        this.getallAppointments();
    }
  })
}


/* delete patient */
deletePatient(id:Number){
  this.ser.deleteAppointment(id).subscribe({
    next:(res)=>{
      alert("patient deleted successfully");
      this.getallAppointments();

    },
    error:(err)=>{"error while deleting data"}
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
