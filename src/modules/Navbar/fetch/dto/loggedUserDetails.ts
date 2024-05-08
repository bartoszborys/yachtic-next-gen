export default interface LoggedUserDetails {
    id: number;
    client_id: number;
    flag_merchant: number;
    first_name: string;
    last_name: string;
    invoice_name?: string;
    invoice_nip?: string;
    invoice_street: string;
    invoice_home_number: string;
    invoice_flat_number?: string;
    invoice_zipcode: string;
    invoice_city: string;
    invoice_phone: string;
    importantInformation?: string;
    invoiceNationalityId: number;
    invoiceNationalityCode: string;
}