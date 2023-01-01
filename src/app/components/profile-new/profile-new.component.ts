import { IfStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { Profile } from './model/profile.model';

@Component({
  selector: 'app-profile-new',
  templateUrl: './profile-new.component.html',
  styleUrls: ['./profile-new.component.scss']
})
export class ProfileNewComponent implements OnInit,OnDestroy {
  profileFormGroup: FormGroup;
  hasGarage: boolean = false;
  profileDetails: Profile;
  editClicked = false;
  constructor(private _formBuilder: FormBuilder, public commonService: CommonServiceService, public authService: AuthService) {
    this.profileFormGroup = this._formBuilder.group({
      name: [''],
      surname: [''],
      garage: [''],
      gender: [''],
      birthday: [''],
      ldate: [''],
      lcountry: [''],
      status: [''],
      code: [''],
      job: [''],
    })
    this.profileDetails = new Profile();
  }

  ngOnInit(): void {
    let profile = localStorage.getItem('profile');
    if (profile) {
      const data = JSON.parse(profile);
      this.profileDetails.name = data.name;
      this.profileDetails.surname = data.surname;
      this.profileDetails.gender = data.gender;
      this.profileDetails.marital_status = data.marital_status;
      this.profileDetails.license_country = data.license_country;
      this.profileDetails.license_date = data.license_date;
      this.profileDetails.zipcode = data.zipcode;
      this.profileDetails.job = data.job;
      this.profileDetails.hasGarage = data.hasGarage;
      this.profileDetails.isLockable = data.isLockable;
      this.profileDetails.birthday = data.birthday;
      
    }
    else {
      let user: any;
      user = localStorage.getItem('user');
      const ab = JSON.parse(user);
      if (ab.displayName) {
        const str = ab.displayName;
        this.profileDetails.name = str.substring(0, str.indexOf(' '));
        this.profileDetails.surname = str.substring(str.indexOf(' ') + 1);
      }
    }
    
  }
  onSubmit() {

  }
  garageCheck(event: any) {
    this.hasGarage = event.target.checked;
    if (this.hasGarage) {
      this.profileDetails.hasGarage = true;
    }
    else {
      this.profileDetails.hasGarage = false;
    }
  }
  lockCheck(event: any) {
    if (event.target.checked) {
      this.profileDetails.isLockable = true;
    }
    else {
      this.profileDetails.isLockable = false;
    }
  }
  gotoEdit() {
    this.editClicked = true;
  }
  ngOnDestroy(){
    localStorage.setItem('profile',JSON.stringify(this.profileDetails));
  }

}
