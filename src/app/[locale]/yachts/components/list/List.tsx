"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getYachts } from "../../data/list";
import YachtsData from "../../types/YachtData";
import Yacht from "./components/Yacht";
import { useAppSelector } from "../../store/hooks";

export default function List() {
    const [yachts, setYachts] = useState<YachtsData[]>([]);
    const search = useAppSelector(state => state.search);
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams();
        
        Object.entries(search).forEach(([key, value]) => {
            if(value instanceof Array) {
                if(value.length === 0) {
                    return;
                }
            }

            if(value) {
                params.append(key, value);
            }
        }); 
        
        router.push(`/yachts?${params.toString()}`, {scroll: false});

        (async () => {
            try {
                setYachts(await getYachts(params));
            }
            catch {
                setYachts([]);
            }
        })()
    }, [search]);

    return (
        <>
            <div className="d-flex flex-col">
                {yachts.map(yacht => <Yacht key={yacht.id} data={yacht}/>)}
            </div>
        </>
    );
}