

interface User {
    _id: string;
    name: string;
    email: string;
    username: string;
    photo  :  string;
    balance : number;
    warnedCount : number
    suspended: boolean;
}

interface ApiResponse {
    USERS: User[];
    pagination: {
        skip: number;
        hasMore: boolean;
        nextSkip: number | null;
    };
}
