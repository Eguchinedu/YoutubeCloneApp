import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Posts!: any;

  constructor(public _service: ServiceService){

  }

  ngOnInit(): void {
    this._service.getUsers().subscribe((res)=> console.log(res)
    );

    this.getPosts();
  }

  getPosts(){
    this._service.getAllPosts().subscribe((res)=> this.Posts = res);
  }
}
