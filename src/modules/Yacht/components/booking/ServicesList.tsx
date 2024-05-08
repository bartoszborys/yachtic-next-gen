import { useMemo } from "react";
import { YachtService } from "../../interfaces/YachtData";

interface ServicesListProps {
    readonly description: string;
    readonly services: YachtService[];
}

export function ServicesList({services, description}: ServicesListProps) {
    const list = useMemo(() => {
        return services.map(
            (service, index) => 
                <li key={index} className="flex gap-2 justify-between text-xs">
                    <div className="w-1 h-1 rounded-full bg-secondary mt-[5px]"/>
                    <span className="flex-1 text-wrap">{service.name}</span>
                    <b className="text-nowrap">{service.amount} {service.currencySymbol}</b>
                </li>
            );
    }, [services])

    return (
        <>
            <h6 className="font-bold text-[#666666]">{description}</h6>
            <ul className="text-secondary">{list}</ul>
        </>
    );
}