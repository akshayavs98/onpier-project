export class Profile {
    public name:string;
    public surname:string;
    public marital_status:string;
    public job:string;
    public gender:string;
    public license_date:string;
    public license_country:string;
    public zipcode:string;
    public birthday:string;
    public hasGarage:boolean;
    public isLockable:boolean;

    constructor(){
        this.name = '';
        this.surname = '';
        this.marital_status = '';
        this.job = '';
        this.gender= '';
        this.license_country = '';
        this.license_date = '';
        this.zipcode = '';
        this.birthday= '';
        this.hasGarage= false;
        this.isLockable = false;

    }

}
