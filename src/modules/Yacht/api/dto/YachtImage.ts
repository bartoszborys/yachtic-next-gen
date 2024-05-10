interface YachtImage {
    readonly id: number;
    readonly sysName: string;
    readonly src: string;
    readonly description: string;
    readonly alt: string;
}

interface ImageWithType {
    readonly type: ImageType;
    readonly image: YachtImage;
}

export enum ImageType {
    MINIATURE_URL = "miniatureUrl",
    URL = "url",
    LIGHTBOX_URL = "lightboxUrl",
    MOBILE_LIGHTBOX_URL = "mobileLightboxUrl",
}

export default interface YachtSliderImage {
    readonly id: number;
    readonly sysName: string;
    readonly images: ImageWithType[];
}