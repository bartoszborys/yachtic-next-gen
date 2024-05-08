import { useTranslations } from "next-intl";

export function SpecificationAndEquipment({yachtSpecification}: {yachtSpecification: YachtSpecification}) {
    const t = useTranslations("Yacht.YachtContent");
    return (
        <>
            <h3 className="font-bold">SPECIFICATION</h3>
            <div className="grid grid-cols-3 gap-1">
                {
                    Object
                        .entries(yachtSpecification.details)
                        .map(
                            ([key, value]) =>
                                <div key={key} className="flex justify-between px-2 even:bg-[#f2f8fc]">
                                    <span>{t(key)}</span>
                                    <b>{value}</b>
                                </div>
                        )
                }
            </div>
            <h3 className="font-bold">EQUIPMENT (optional)</h3>
            <div className="grid grid-cols-3">
                {yachtSpecification.equipments.map((equipment) => <div key={equipment.id} className="flex justify-between px-2 even:bg-[#f2f8fc]">{equipment.name}</div>)}
            </div>
        </>
    );
}