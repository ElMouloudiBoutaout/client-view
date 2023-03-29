export interface ResponseAPI {
    info: Info;
    results: Result[];
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface Result {
    id: number;
    fullName: string;
    img: string;
    description: string;
    averageRating: number
    jobs : string[];
}