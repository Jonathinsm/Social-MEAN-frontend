import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
  providers: [UserService, FollowService]
})
export class FollowingComponent implements OnInit {
  public title:string;
  public url: string;
  public user: User;
  public follows;
  public following;
  public identity;
  public token;
  public page;
  public prev_page;
  public next_page;
  public total;
  public pages;
  public users: User[];
  public status: string;
  public userPageId;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = 'Usuarios seguidos por ';
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.actualPage();
  }

  actualPage(){
    this._route.params.subscribe(params =>{
      let user_id = params['id'];
      this.userPageId = user_id;
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
      this.getUser(user_id, page);
    });
  };

  getFollows(user_id, page){
    this._followService.getFollowing(this.token,user_id,page).subscribe(
      response => {
        if(!response.follows){
          this.status = 'error';
        }else{
          console.log(response)
          
          this.total = response.total;
          this.following = response.follows;
          this.pages = response.pages;
          this.follows = response.users_following;
          if(page > this.pages){
            this._router.navigate(['/gente',1]);
          }

        }

      },
      error => {
        var errorMsg = <any>error;
        console.log(errorMsg);

        if(errorMsg != null){
          this.status = 'error';
        }
      }
    ) 
  }

  getUser(user_id,page){
    this._userService.getUser(user_id).subscribe(
      res => {
        if(res.user){
        this.user = res.user;
        this.getFollows(user_id,page);
        }else{
          this._router.navigate(['/home']);
        }
      },
      err => {
        var errorMsg = <any>err;
        console.log(errorMsg);

        if(errorMsg != null){
          this.status = 'error';
        }  
      }
    )
  }

  public followUserOver;
  mouseEnter(user_id){
    this.followUserOver = user_id;
  }

  mouseLeave(user_id){
    this.followUserOver = 0;
  }

  followUser(followed){
    var follow = new Follow('',this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      res => {
        if(!res.follow){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.follows.push(followed);
        }
      },
      err =>{
        var errorMsg = <any>err;
        console.log(errorMsg);

        if(errorMsg != null){
          this.status = 'error';
        }
      }
    )
  }

  unfollowUser(followed){
    this._followService.deleteFollow(this.token, followed).subscribe(
      res =>{
        var search = this.follows.indexOf(followed);
        if(search != -1){
          this.follows.splice(search, 1);
        }
      },
      err =>{
        var errorMsg = <any>err;
        console.log(errorMsg);

        if(errorMsg != null){
          this.status = 'error';
        }
      }
    )
  }
}
