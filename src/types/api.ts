export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    origin: Location;
    location: Location;
    type: string;
    gender: string;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface Location {
    name: string;
    url: string;
}

export interface InfoPagination {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface ResponseCharacter {
    info: InfoPagination;
    results: Character[];
}

