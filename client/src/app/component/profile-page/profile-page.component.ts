import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onhandleProfile()
  }
  profileDetails: any;
  onhandleProfile() {
    const id = this.route.snapshot.paramMap.get('id');    
    this.sharedService.getProfileApi(id).subscribe((res: any) => {
      this.profileDetails = res;
      console.log(this.profileDetails);
    });
  }
}
