export class Car {
    public brand: string;
    public model: string;
    public km: string;
    public year: string;
    public shift: string;
    public fuel: string;
    public color: string;
    public cartype: string;
    public ecar: boolean;
    public parts: Parts[]

    constructor(){
        this.brand = '';
        this.model = '';
        this.km = '';
        this.year = '';
        this.shift = '';
        this.fuel = '';
        this.color = '';
        this.cartype = '';
        this.ecar = false;
        this.parts = [];
    }
}

export class Parts {
    public name: string;
    public rate: string;

    constructor(){
        this.name = '';
        this.rate = '';
    }
}
