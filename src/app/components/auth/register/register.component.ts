import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  register(name: string, email: string, password: string) {
    this._authService.register({name: name, email: email, password: password})
    .subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/shopping-lists']);
      },
      err => {
        console.log(err.error);
      }
    )
  }

}
