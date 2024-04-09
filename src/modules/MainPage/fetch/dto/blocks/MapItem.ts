export interface MapItem {
    type: string;
    order: number;
    title: {
        type: string;
        content: string;
    };
    image: {
        type: string;
        fileId: string;
        fileUrl: string;
        fileSize: number;
        fileType: string;
    };
    mobilePhoto: {
        type: string;
        fileId: string;
        fileUrl: string;
        fileSize: number;
        fileType: string;
    };
}