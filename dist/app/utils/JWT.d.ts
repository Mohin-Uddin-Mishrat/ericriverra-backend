import { JwtPayload, Secret } from 'jsonwebtoken';
export declare const jwtHelpers: {
    generateToken: (payload: object, secret: Secret, expiresIn: string) => string;
    verifyToken: (token: string, secret: Secret) => JwtPayload;
};
export type JwtPayloadType = JwtPayload & {
    email: string;
    role: string;
    iat: number;
    exp: number;
};
export type JwtTokenType = string | JwtPayloadType | null;
//# sourceMappingURL=JWT.d.ts.map