export interface PopularItem {
    type: string;
    order: number;
    header: {
        type: string;
        content: string;
    };
    photo: {
        type: string;
        fileId: string;
        fileUrl: string;
        fileSize: number;
        fileType: string;
    };
    url: {
        type: string;
        content: string;
    };
}