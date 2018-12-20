import { Review } from './review';

export class Reviewer {
    name: string;
    bio: string;
    faveGenres: string[];
    faveMovies: string[];
    reviews: Review[];
}