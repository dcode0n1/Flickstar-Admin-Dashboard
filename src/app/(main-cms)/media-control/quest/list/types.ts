

interface Quest {
    _id: string;
    title: string;
    description: string;
    maxApplicants: number;
    totalAmount: number;
    suspended: boolean;
}

interface ApiResponse {
    QUESTS: Quest[];
    pagination: {
        skip: number;
        hasMore: boolean;
        nextSkip: number | null;
    };
}
