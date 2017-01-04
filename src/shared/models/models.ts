export class Route {
    name: string;
    no: string;
    grade: string;
    heigth: number;
    qDraws: number;
    type: string;
    makers: string;
}

export class Sector {
    name:string;
    route:Route[];
}

export class Crag{
    name:string;
    info:string;
    facing:string;
    image:string;
    sectrors:Sector[];
}