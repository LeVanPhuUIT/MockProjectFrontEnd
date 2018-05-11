import { Books } from './books';

export class Comment {
    book: Books;
    commentId: number;
    bookId: number;
    commentContent: string;
    createDate: string;
    isActive: boolean;
}
