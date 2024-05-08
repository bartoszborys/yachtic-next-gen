interface YachtDetails {
    year: number;
    length: number;
    width: number;
    fuelTank: number;
    draft: number;
    waterTank: number;
    berths: number;
    enginesPower: number;
    bathrooms: number;
    cabins: number;
    maxPersons: number;
}

interface Equipment {
    id: number;
    name: string;
    quantity: number | null;
}

interface YachtSpecification {
    details: YachtDetails;
    equipments: Equipment[];
}