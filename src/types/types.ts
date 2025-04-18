export type Author = {
    name: string;
    picture: string;
};

export type CommentType = {
    id: string;
    parent_id: string | null;
    author: Author;
    text: string;
    timestamp: number;
};

