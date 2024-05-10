'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface ImagesSliderProps {
    readonly urls: any;
    readonly current: number;
    readonly count: number;
    readonly setCurrent: Dispatch<SetStateAction<number>>;
}

export default function ImagesCarousel({ urls, count, current, setCurrent }: ImagesSliderProps) {
    const [api, setApi] = useState<CarouselApi>();

    const counter = useMemo(
        () => <div className="text-sm absolute bottom-0 right-0 m-2 px-2 py-1 rounded bg-black text-white">{current} / {count}</div>,
        [current, count]
    );

    useEffect(() => {
        if (!api) {
            return
        }

        api.reInit({ loop: true });

        if (api.selectedScrollSnap() + 1 !== current) {
            api?.scrollTo(current, true);
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api])

    useEffect(() => {
        if (!api) {
            return;
        }

        if (api.selectedScrollSnap() + 1 !== current) {
            api?.scrollTo(current - 1);
        }
    }, [current])


    return (
        <Carousel setApi={setApi}>
            <CarouselContent>{urls}</CarouselContent>            
            {/* <CarouselPrevious />
            <CarouselNext /> */}
            {counter}
        </Carousel>
    );
}