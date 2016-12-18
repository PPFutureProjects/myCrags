export interface ICrag {
    _id?: string;
    name?: string;
    lat: number;
    lng: number;
    placeType:string;//crag, parking, camp...
    draggable: boolean;
    icon:string;
    imagePath: string;
    routes:IRoute[];
}

export interface IRoute {
    _id?: string;
    cragId:string;
    name: string;
    orderNo:string;
    routeNo:string;
    grade:string;
    heigth:string;
    climbType:string; //sport, trad, mixed....
    qDraws:number;
}

export interface IPage {
    title: string;
    component: any;
    icon: string;
    logsOut?: boolean;
    index?: number;
}