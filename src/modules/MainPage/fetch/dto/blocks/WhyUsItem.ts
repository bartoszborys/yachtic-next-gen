export interface WhyUsItem {
    type: string;
    order: number;
    header: {
        type: string;
        content: string;
    };
    description: {
        type: string;
        content: string;
    };
    icon: {
        type: string;
        fileId: string;
        fileUrl: string;
        fileSize: number;
        fileType: string;
    };
}