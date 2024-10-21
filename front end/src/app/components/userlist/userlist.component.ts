import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users : Observable<User[]> | undefined;

  constructor(private _serive : UserService) { }

  ngOnInit(): void 
  {
    this.users = this._serive.getAllUsers();
  }
  deleteUser(Professor: any)
  {
    this._serive.deleteUser(Professor).subscribe(
      data => {
        console.log("User Deleted succesfully");
       
      },
      error => {
        console.log("Unable to delete User");
        console.log(error.error);
      }
    )
  }

}
