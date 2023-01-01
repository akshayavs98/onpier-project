import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CarServiceService } from 'src/app/shared/services/car-service.service';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  carDetails: any;
  brandList: any;
  colorList: any;
  carTypeList: any;
  duplicateBrandList: any;
  duplicateColorList: any;
  duplicateTypeList: any;
  storeCarDetails: any;
  constructor(public carService: CarServiceService, public authService: AuthService,public commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.carTypeList = [];
    this.brandList = [];
    this.colorList = [];
    this.duplicateBrandList = [];
    this.duplicateColorList = [];
    this.duplicateTypeList = [];
    this.carService.getCarData().subscribe(data => {
      if (data) {
        this.carDetails = [];
        this.carDetails = data;
        if(this.commonService.carList){
           this.commonService.carList.forEach(car => {
                this.carDetails.push(car);
           })
        }
        this.storeCarDetails = this.carDetails;
        this.carDetails.forEach((element: { brand: any; color: any; car_type: any; }) => {
         this.duplicateBrandList.push(element.brand);
         this.duplicateColorList.push(element.color);
         this.duplicateTypeList.push(element.car_type);
        })
        this.brandList = [... new Set(this.duplicateBrandList)];
        this.colorList = [... new Set(this.duplicateColorList)];
        this.carTypeList = [... new Set(this.duplicateTypeList)];
      }
    })
  }

  applyFilter(e: any, type: any) {
    const value = e.target.value;
    switch (type) {
      case 'brand':
        this.carDetails = this.carDetails.filter((obj: { brand: any; }) => {
          return obj.brand === value;
        });
        break;
      case 'color':
        this.carDetails = this.carDetails.filter((obj: { color: any; }) => {
          return obj.color === value;
        });
        break;
      case 'ctype':
        this.carDetails = this.carDetails.filter((obj: { car_type: any; }) => {
          return obj.car_type === value;
        });
        break;
    }
  }
  clearFilter(){
    this.carDetails = this.storeCarDetails;
  }
  
  
}
