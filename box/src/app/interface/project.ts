export interface Project {
    title: string;
    subtitle: string;
    technology: string[];
    photos: Photos;
}

interface Photos {
    [att: string]: string;
}