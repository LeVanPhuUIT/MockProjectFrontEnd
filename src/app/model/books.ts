 import { Author} from './author';
 import { Category } from './category';
 import { Comment } from './comment';
 import { Publisher } from './publisher';

export class Books {
    author: Author;
    publisher: Publisher;
    category: Category;
    comment: Comment[];
    bookId: number;
    title: string;
    cateId: number;
    authorId: number;
    pubId: number;
    summary: string;
    imgUrl: string;
    price: number;
    quantity: number;
    createDay: string;
    modifiedDay: string;
    isActive: boolean;
}
