import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('profile');
  }
signIn(user: string,password: string){
  console.log(user)
  console.log(password)
   this.authService.SignIn(user,password);
}
}
