import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) {

   }
   getdata()
   {
     return this.http.get<HttpResponse<any>[]>("http://localhost:3000/patients");
   }

   postPatient(data:any)
   {
    return this.http.post("http://localhost:3000/patients/",data);
   }
   updatePatient(data:any , id:Number)
   {
     return this.http.put("http://localhost:3000/patients/"+id ,data);
   }
   deletePatient(id:Number)
   {
      return this.http.delete("http://localhost:3000/patients/"+id)
   }




   getAppointments()
   {
     return this.http.get<HttpResponse<any>[]>("http://localhost:3000/appointments");
   }

   postAppointment(data:any)
   {
    return this.http.post("http://localhost:3000/appointments/",data);
   }

   updateAppointment(data:any , id:Number)
   {
     return this.http.put("http://localhost:3000/appointments/"+id ,data);
   }
   deleteAppointment(id:Number)
   {
      return this.http.delete("http://localhost:3000/appointments/"+id)
   }
}
