import LoggedUserDetails from "./loggedUserDetails";

export default interface LoggedUser {
    id: number;
    is_internal: boolean;
    email: string;
    abeonClientsDetail: LoggedUserDetails;
    password?: string;
    oldPassword?: string;
    password_reset_token?: string;
    confirm_account_token?: string;
    new_email?: string;
    new_email_token?: string;
    wasPasswordVerified: boolean;
    maxInitialyReservedReservations: number;
    verifiedByToken: boolean;
}
