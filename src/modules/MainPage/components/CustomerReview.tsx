import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import ReviewTile from "./review/ReviewTile";

export function CustomerRate(): ReactElement {
    const t = useTranslations();

    return (
        <>
            <div className="flex w-full text-primary">
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
                    <ReviewTile  />
                    <ReviewTile  />
                    <ReviewTile  />
                    <ReviewTile  />
                    <ReviewTile  />
                    <ReviewTile  />
                    <ReviewTile  />
                    <ReviewTile  />
                    <ReviewTile  />
                </CarouselContent>
            </Carousel>
            </div>
        </>
    )
}