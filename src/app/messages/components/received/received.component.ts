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
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css'],
  providers: [UserService, FollowService,MessageService]
})
export class ReceivedComponent implements OnInit {
  public title: string;
  public identity;
  public token;
  public url:string;
  public status:string;
  public follows;
  public messages:Message[];
  public pages;
  public total;
  public page;
  public next_page;
  public prev_page;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
    private _followService: FollowService
  ) {
    this.title = 'Inbox';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }


  ngOnInit() {
    this.actualPage();
  }
  actualPage(){
    this._route.params.subscribe(params =>{
      let user_id = params['id'];
      let page = +params['page'];
      this.page = page;
      /*
      if(!params['page']){
        page = 1;
      };*/
      if(!page){
        page = 1;
        this.next_page = page+1;
        this.prev_page = page-1;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;

        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }
      //Return the list of users
      this.getMessages(this.token, this.page);
    });
  };

  getMessages(token,page){
    this._messageService.getMyMessages(token,page).subscribe(
      res =>{
        if(!res.messages){
          console.log('Error')
        }else{
          this.messages = res.messages;
          this.total = res.total;
          this.pages = res.pages;
        }
      },
      err =>{
        console.log(<any>err)
      }
    )
  }
}
