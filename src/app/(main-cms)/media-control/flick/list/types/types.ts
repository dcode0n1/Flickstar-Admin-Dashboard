interface ApiResponse{ 
    FLICKS: Flick[]; 
    pagination: { 
        skip: number; 
        hasMore: boolean; 
        nextSkip: number | null; 
    }; 
}

interface Flick {
    _id: string;
    user : {
        username :  string;
        photo : string
    }
    thumbnailURL : string;
    description :  string;
    repostCount : number;
    createdAt : string;
    suspended :  boolean;
}