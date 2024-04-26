import { YachtService } from "../interfaces/YachtData";

export default function ServiceRow({service}: {service: YachtService}) {
    return <div
            key={service.name}
            className="text-secondary w-full p-2 even:bg-[#f2f8fc] flex justify-between">
            <span>{service.name}</span>
            <span className="flex gap-2 text-black mr-16 text-nowrap text-sm">
                <b className="flex-1">{service.amount} {service.currencySymbol}</b>
                <span className="flex-1 min-w-[100px]">{service.priceMeasure}</span>
            </span>
        </div>
}