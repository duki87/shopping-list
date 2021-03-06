import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this._authService.login({email: email, password: password})
      .subscribe(
        res => {
          if(res.status === 200) {
            this._router.navigate(['/shopping-lists']);
          }         
        },
        err => {
          console.log(err.error);
        }
      )
  }

}
