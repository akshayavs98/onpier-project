import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { Car, Parts } from './model/car.model';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit {
  carFormGroup: FormGroup;
  damagedPartForm: FormGroup;
  carDetails: Car;
  ecar: any;
  carInsurance: any = 0;
  partName: any;
  partCost: any;
  partList: Parts[] = new Array();
  addSuccess = false;
  constructor(private _formBuilder: FormBuilder, public commonService: CommonServiceService, public authService: AuthService) {
    this.carFormGroup = this._formBuilder.group({
      brand: [''],
      model: [''],
      km: [''],
      year: [''],
      shift: [''],
      fuel: [''],
      color: [''],
      cartype: [''],
      ecar: ['']
    })
    this.damagedPartForm = this._formBuilder.group({
      parts: this._formBuilder.array([])
    })
    this.addPart();
    this.carDetails = new Car();
  }

  get parts() {
    return this.damagedPartForm.controls["parts"] as FormArray;
  }

  ngOnInit(): void {
  }

  addPart() {
    const part = this._formBuilder.group({
      name: [],
      rate: []
    })
    this.parts.push(part);
  }
  deletePart(i: any) {
    this.parts.removeAt(i);
  }

  onSubmit() {
    if (this.ecar === "yes") {
      this.carDetails.ecar = true;
    }
    else {
      this.carDetails.ecar = false;
    }
  }
  addCar() {
    this.damagedPartForm.value.parts.forEach((part: { name: any; rate: any; }) => {
      this.carDetails.parts.push({
        name : part.name,
        rate : part.rate
      })
    })
    if(this.ecar === "yes"){
      this.carDetails.ecar = true;
    }
    else {
      this.carDetails.ecar = false;
    }
    this.commonService.carList.push(this.carDetails);
    this.addSuccess = true;
    setTimeout(() => {
      this.addSuccess = false;
    }, 5000)
  }
  calculateInsurance(event:any,value: any):boolean {
    this.carInsurance = 0;
    let year = new String(this.carDetails.year);
    let yearFactor = 0;
    let kmFactor = 0;
    let yearDifferance = 0;
    let km = 0;
    if (value === 'year' && year.length === 3) {
      const currentYear = new Date().getFullYear();
      yearDifferance = currentYear - (+this.carDetails.year);   
    }
    else if (value === 'km') {
      km = +this.carDetails.km;
    }
    if (yearDifferance <= 5) {
      yearFactor = 1
    }
    else if (yearDifferance > 5 && yearDifferance <= 10) {
      yearFactor = 2;
    }
    else if (yearDifferance > 10) {
      yearFactor = 3;
    }
    if ( km <= 10000) {
      kmFactor = 1;
    }
    else if (km > 10000 && km <= 50000) {
      kmFactor = 2;
    }
    else if (km > 50000) {
      kmFactor = 3;
    }
    
    this.carInsurance = 100 + (25 * yearFactor) + (30 * kmFactor);
    return this.commonService.onlyNumberKey(event);
  }

}
