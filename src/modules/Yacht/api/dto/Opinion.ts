export default interface Opinion {
    id: number;
    yachtId: number;
    clientId: number;
    rate: number;
    rateCleanliness: number;
    rateComfort: number;
    rateEquipments: number;
    rateTechnicalCondition: number;
    rateNautical: number;
    rateOperator: number;
    contentAdvantages: string;
    contentDefects: string;
    signature: string;
    createdAt: string;
    yachtName: string;
    yachtModelName: string;
    yachtUrl: string;
}