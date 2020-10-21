export interface Users {
    iduser?: string;
    campus: Int32Array;
    numId: string;
    documentType: string;
    keyword: any;
    firstName: string;
    lastName: string;
    isEmployee?: boolean;
    isLogged?: boolean;
    update_at: Date;
    create_at?: Date;
}

export interface Login{
    numId: string;
    keyword: string;
}

export interface City {
    idcity?: Int32Array;
    cityname: string;
    city_description: string;
}

export interface Campus {
    idcampus?: Int32Array;
    idcity: Int32Array;
    campusname: string;
    campus_description: string;
}