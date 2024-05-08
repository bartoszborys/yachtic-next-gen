import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";

export function CustomerRate(): ReactElement {
    const t = useTranslations();

    return (
        <>

            <div className="flex w-full">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
            </div>
            <h2 className="font-bold text-2xl my-2">{t("CUSTOMER_RATE_HEADER", { from: 4.9, to: 5 })}</h2>
            <div className="flex overflow-auto relative w-full h-56">
            <Carousel className="cursor-grab active:cursor-grabbing">
                <CarouselContent>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 1</CarouselItem>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 2</CarouselItem>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 3</CarouselItem>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 3</CarouselItem>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 3</CarouselItem>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 3</CarouselItem>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 3</CarouselItem>
                    <CarouselItem className="basis-1/4 w-80 h-44 bg-white text-center flex flex-col justify-center mr-2">Witam 3</CarouselItem>
                </CarouselContent>
            </Carousel>
            </div>
        </>
    )
}