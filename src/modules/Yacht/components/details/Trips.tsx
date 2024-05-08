import { Trip } from "@/modules/Yacht/api/dto/Trip";
import { useMemo } from "react";

interface TripsProps {
    readonly trips: Trip[];
}

export function Trips({trips}: TripsProps) {
    const listItems = useMemo(() => {
        return trips.map(trip => (
            <li key={trip.id} className="text-sm text-sky-500 my-1">
                <a href={trip.url}>{trip.name} ({trip.days} days)</a>
            </li>
        ));
    }, trips);

    return (
        <ul className="font-bold list-disc list-inside">{listItems}</ul>
    )
}