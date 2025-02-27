

interface Role {
    _id: string;
    name: string;
    status: boolean;
}

interface ApiResponse {
    ROLES: Role[];
    pagination: {
        skip: number;
        hasMore: boolean;
        nextSkip: number | null;
    };
}
