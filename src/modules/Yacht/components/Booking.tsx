import { useTranslations } from "next-intl";
import PriceInfo from "./booking/PriceInfo";
import { BookingData } from "../interfaces/YachtData";
import { ServicesList } from "./booking/ServicesList";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faPlus, faQuestion, faShare } from "@fortawesome/free-solid-svg-icons";
import { ActionLink } from "./booking/ActionLink";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface BookingProps {
    readonly data: BookingData;
}

export default function Booking({ data }: BookingProps) {
    const t = useTranslations();

    const onSpotServices = useMemo(() => {
        const onSpot = data.services.filter(service => service.isOnSpot)
        if (onSpot.length > 0) {
            return <ServicesList description="To pay on spot" services={onSpot} />;
        }
        return <></>;
    }, [data.services]);

    const mandatoryServices = useMemo(() => {
        const onSpot = data.services.filter(service => service.isMandatory)
        if (onSpot.length > 0) {
            return <ServicesList description="Mandatory extras" services={onSpot} />;
        }
        return <></>;
    }, [data.services]);

    const freeServices = useMemo(() => {
        const onSpot = data.services.filter(service => service.isFree)
        if (onSpot.length > 0) {
            return <ServicesList description="Price incl." services={onSpot} />;
        }
        return <></>;
    }, [data.services]);


    return (
        <>
            <h3 className="bg-warning text-center font-bold">LAST MINUTE</h3>
            <div className="flex flex-col gap-2">
                <div className="bg-[#ebedec] text-gray-500 p-4 flex">
                    <label className="m-auto py-4 px-2">
                        Reservation period:
                        <input className="ml-2 border rounded-md p-1" type="date"></input>
                    </label>
                </div>

                {
                    data.nonRefundableDetails
                        ? <PriceInfo className="bg-[#ebedec] p-4" details={data.nonRefundableDetails} />
                        : <></>
                }

                <PriceInfo className="bg-[#ebedec] p-4" details={data.priceDetails} />

                <section className="bg-[#ebedec] p-4">
                    <h6 className="font-bold text-[#666666]">PAYMENT</h6>
                    <ul className="list-disc list-inside">
                        <li>till TODO</li>
                    </ul>
                </section>


                <section className="bg-white p-4 flex flex-col gap-2">
                    {onSpotServices}
                    {mandatoryServices}
                    {freeServices}
                </section>

                <section>
                    {data.extendedInfos.map(info => 
                        <div key={info.id} className="bg-[#e8fff3] text-secondary text-sm p-2" dangerouslySetInnerHTML={{__html: info.description}} />
                    )}
                </section>

                <ul className="bg-[#ebedec] text-secondary text-xs p-2">
                    {data.usefulInfos.map(info => 
                        <li key={info.id} dangerouslySetInnerHTML={{__html: info.description}} />
                    )}
                </ul>

                <ul className="mt-4">
                    <ActionLink icon={faQuestion} text="ASK ABOUT THAT BOAT" />
                    <ActionLink icon={faHeart} text="ADD TO FAVOURITES" />
                    <ActionLink icon={faPlus} text="ADD TO COMPARE" />
                    <ActionLink icon={faComment} text="ADD REVIEW" />
                    <ActionLink icon={faShare} text="SHARE WITH FRIENDS" />
                    <ActionLink icon={faFacebook as IconProp} text="SHARE ON FACEBOOK" />
                </ul>
            </div>
        </>
    )
}