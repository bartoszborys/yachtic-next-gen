export interface OpinionItem {
    type: string;
    order: number;
    text: {
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
    name: {
        type: string;
        content: string;
    };
    url: {
        type: string;
        content: string;
    };
}