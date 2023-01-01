import { Injectable } from '@angular/core';
import { Car } from 'src/app/components/add-new-car/model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  carList: Car[] = new Array();
  constructor() { }

  onlyNumberKey(event: any):boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
}
}
