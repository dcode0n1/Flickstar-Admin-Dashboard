interface ApiResponse {
    SONGS: Song[];
    pagination: {
        skip: number;
        hasMore: boolean;
        nextSkip: number | null;
    };
}

interface Song {
    _id: string;
    name: string;
    icon: string;
    duration: string;
    url: string;
    used: number;
}