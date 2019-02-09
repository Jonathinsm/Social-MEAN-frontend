import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User("","","","","","","ROLE_USER","","");
  }

  ngOnInit() {
  }

  onSubmit(){
    this._userService.signup(this.user).subscribe(
      response =>{
        this.identity = response.user;
        //console.log(this.identity);
        if(!this.identity || !this.identity._id){
          this.status = 'error';
        }else{
          //Persistir datos del usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //Conseguir el token
          this.getToken();
        }
        
      },
      error =>{
        var errorMsg = <any>error;
        console.log(errorMsg);
        if(errorMsg != null){
          this.status = 'error';
        }
      }
    )
  }

  getToken(){
    this._userService.signup(this.user, 'true').subscribe(
      response =>{
        this.token = response.token;
        //console.log(this.token);
        if(this.token.length <= 0){
          this.status = 'error';
        }else{
          //Persistir token del usuario
          localStorage.setItem('token', JSON.stringify(this.token));

          this.getCounters();

          //Conseguir los contadores o estadisticas del usuario
        }
        
      },
      error =>{
        var errorMsg = <any>error;
        console.log(errorMsg);
        if(errorMsg != null){
          this.status = 'error';
        }
      }
    )
  }

  getCounters(){
    this._userService.getCounters().subscribe(
      response =>{
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'sucess';
        this._router.navigate(['home']);
        //if(response.following.length <= 0)
      },
      error =>{
        console.log(error);
      }
    )
  }

}
