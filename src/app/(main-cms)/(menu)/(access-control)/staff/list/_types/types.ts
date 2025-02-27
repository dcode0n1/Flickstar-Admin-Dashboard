


interface Staff {
    _id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    status: boolean;
    profileImage: string;
}

interface ApiResponse {
    STAFF: Staff[];
    pagination: {
        skip: number;
        hasMore: boolean;
        nextSkip: number | null;
    };
}

interface StaffListHeadings {
    display: string;
    key?: string;
}