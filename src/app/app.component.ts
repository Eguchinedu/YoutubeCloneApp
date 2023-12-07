import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cloudinary } from '@cloudinary/url-gen';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'YoutubeCloneApp';

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    const cld = new Cloudinary({ cloud: { cloudName: 'dtgaovjxc' } });
  }
}
