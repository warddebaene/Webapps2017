
import { User } from '../user.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
@Input() public user: User;
  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  removeRecipe() : boolean{
  //this._authenticationService.addFriend(this.user).subscribe();
  //this.router.navigate(['']);
  return false;
  }

  addFriend() : boolean{
  return false;
  }

}
