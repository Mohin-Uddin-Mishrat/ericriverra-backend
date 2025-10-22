export type TAccount = {
    name:string;
    email: string;
    password: string;
    bio?:string;
    lastPasswordChange?: Date;
    isDeleted?: boolean;
    phoneNumber?:string;
    companyName?:string;
    accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    role?: "USER" | "ADMIN" | "ARCHITECTURE"  ,
    isVerified?: boolean,
}

export type TUpdateProfilePayload = {
  name?: string;
  bio?: string;
  phoneNumber?: string;
  companyName?: string;
};
export interface TRegisterPayload extends TAccount {
    name: string
}

export type TLoginPayload = {
    email: string;
    password: string
}

export type TJwtUser = {
    email: string,
    role?: "USER" | "ADMIN" | "ARCHITECTURE",
}