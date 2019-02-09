import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Follow } from '../../../models/follow';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { FollowService } from '../../../services/follow.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, FollowService,MessageService]
})
export class AddComponent implements OnInit {
  public title: string;
  public message: Message;
  public identity;
  public token;
  public url:string;
  public status:string;
  public follows;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
    private _followService: FollowService
  ) {
    this.title = 'Send';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.message = new Message ('','','','',this.identity._id,'');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getMyFollows();
  }

  onSubmit(form){
    console.log(this.message);
    this._messageService.addMessage(this.token, this.message).subscribe(
      res => {
        if(res.message){
          this.status = 'success';
          form.reset();
        }
      },
      err => {
        this.status = 'error';
        console.log(<any>err);
      }
    )
  }

  getMyFollows(){
    this._followService.getMyFollows(this.token).subscribe(
      res => {
        this.follows = res.follows;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

}
