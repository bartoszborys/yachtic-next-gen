'use client'

import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import YachtSliderImage, { ImageType } from "../../api/dto/YachtImage";
import ImagesCarousel from "./ImagesCarousel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ImagesSliderProps {
    readonly images: YachtSliderImage[];
}

export default function ImagesSlider({ images }: ImagesSliderProps) {
    const [initialized, setInitialized] = useState(false);
    const [current, setCurrent] = useState(1);
    const [count,] = useState(images.length);

    const miniatures = useMemo(
        () => images
            .map(
                image => image.images.find(item => item.type === ImageType.MINIATURE_URL)?.image
                    || (() => { throw new Error("Miniature url not found") })()
            )
            .map(
                (miniature, index) =>
                    <Image
                        onClick={() => { setCurrent(index + 1) }}
                        key={miniature.id}
                        className={"cursor-pointer border-2 gap-1 min-w-[44px] min-h-[44px] " + `${(current === index + 1) ? 'border-sky-500' : ''}`}
                        src={miniature.src}
                        alt={miniature.alt}
                        width={44}
                        height={44} />
            ),
        [images, current]
    );

    const urls = useMemo(
        () => images
            .map(
                image => image.images.find(item => item.type === ImageType.URL)?.image
                    || (() => { throw new Error("Miniature url not found") })()
            )
            .map(
                miniature =>
                    <CarouselItem key={miniature.id} className="flex flex-col">
                        <Image
                            className="flex-1"
                            src={miniature.src}
                            alt={miniature.alt}
                            width={900}
                            height={560} />
                    </CarouselItem>
            ),
        [images]
    );

    const handler = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            setCurrent((current) => current - 1);
        }
        else if (event.key === "ArrowRight") {
            event.preventDefault();
            setCurrent((current) => current + 1);
        }
    }, []);

    useEffect(() => {
        if(initialized) {
            return;   
        }
        window.document.body.addEventListener("keydown", handler);
        setInitialized(true);
    }, []);

    return (
        <>
            <Sheet>
                <div className="bg-gray-600 flex cursor-pointer">
                    <SheetTrigger>
                        <ImagesCarousel urls={urls} current={current} setCurrent={setCurrent} count={count} />
                    </SheetTrigger>
                </div>
                <div className="grid justify-between" style={{ gridTemplateColumns: "repeat(auto-fill, 44px)" }}>{miniatures}</div>
                <SheetContent closeCrossClassName="text-white font-bold w-8 h-8" className="border-0 min-w-full bg-black flex flex-col">
                    <div className="w-[45%] m-auto">
                        <ImagesCarousel urls={urls} current={current} setCurrent={setCurrent} count={count} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}