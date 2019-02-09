import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { PublicationService } from '../../services/publication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService, PublicationService]
})
export class PublicationsComponent implements OnInit {
  public identity;
  public token;
  public title: string;
  public url: string;
  public status: string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public publications: Publication[];
  
  @Input() user: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.title = 'Publications';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit() {
    this.getPublications(this.user, this.page);
  }

  getPublications(user, page, adding = false){
    this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
      res => {
        if(res.publications){
          this.total = res.total_items;
          this.pages = res.pages;
          this.itemsPerPage = res.items_per_page;
          
          if(!adding){
            this.publications = res.publications;
            console.log(res.publications)
          }else{
            var arrayA = this.publications;
            var arrayB = res.publications;
            this.publications = arrayA.concat(arrayB);
            $("html, body").animate({scrollTop: $('html').prop("scrollHeight")}, 500);
          }

          if(page > this.pages){
            //this._router.navigate(['/home']);
          }
          
        }else{
          this.status = 'error';
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

  public noMore  = false;
  viewMore(){
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;
    }
    this.getPublications(this.user, this.page, true)
  }

}