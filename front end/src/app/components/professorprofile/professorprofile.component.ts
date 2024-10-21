import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professorprofile',
  templateUrl: './professorprofile.component.html',
  styleUrls: ['./professorprofile.component.css']
})
export class ProfessorprofileComponent implements OnInit {
 
  profileDetails : Observable<Professor[]> | undefined;
  professor: Professor = new Professor;
  msg = ' ';
  currRole = '';
  loggedUser = '';
  temp = false;

  constructor(private _service: ProfessorService, private activatedRoute: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    $("#profilecard").show();
    $("#profileform").hide();
    this.getProfileDetails(this.loggedUser);
  }

  editProfile()
  {
    $("#profilecard").hide();
    $("#profileform").show();
  }

  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);
  }

  updateProfessorProfile()
  {
    this._service.UpdateProfile(this.professor).subscribe(
      data => {
        console.log(data+"Professor Profile Updated succesfully");
        setTimeout(() => {
            this._router.navigate(['/professordashboard']);
          }, 2000);
      },
      error => {
        console.log("Profile Updation Failed");
      }
    )
  }

}
