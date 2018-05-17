 import { Author} from './author';
 import { Category } from './category';
 import { Comment } from './comment';
 import { Publisher } from './publisher';

export class Books {
    author: Author;
    publisher: Publisher;
    category: Category;
    comment: Comment[];
    BookID: number;
    Title: string;
    CateID: number;
    AuthorID: number;
    PubID: number;
    Summary: string;
    public ImgUrl: string;
    Price: number;
    Quantity: number;
    CreateDay: string;
    ModifiedDay: string;
    IsActive: boolean;
    Status: string;
    /**
     *
     */
    constructor() {
       this.Title="";
        
    }
}
