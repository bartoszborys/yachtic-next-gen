'use client'
import { ReactElement, useEffect, useState } from "react";
import { getBlog } from "../../fetch/queries/getBlog";
import Image from "next/image";

export function Blog(): ReactElement {
    const [result, setResult] = useState<any|null>(null);

    useEffect(() => {
        (async () => setResult(await getBlog()))();
    }, []);

    if(!result) {
        return <></>;
    }

    const blogHTML = { __html: result.excerpt.rendered };

    return (
        <>
            <a href={result.link} className="absolute w-full h-full" />
            <Image src={result.yoast_head_json.og_image[0].url} className="w-full min-h-[220px]" width={400} height={220} alt="blog-img" />
            <div className="bg-white p-4 text-lg font-bold text-sky-500">{result.title.rendered}</div>
            <div className="bg-white p-4 flex-1 text-xs text-gray-400" dangerouslySetInnerHTML={blogHTML} />
            <button className="bg-sky-500 p-2 font-bold text-white text-center cursor-pointer">READ MORE...</button>
        </>
    )
}