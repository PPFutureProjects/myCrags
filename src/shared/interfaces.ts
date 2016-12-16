export interface Crag {
    _id?: string;
    name?: string;
    lat: number;
    lng: number;
    placeType:string;//crag, parking, camp...
    draggable: boolean;
    icon:string;
    imagePath: string;
    routes:Route[];
}

export interface Route {
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