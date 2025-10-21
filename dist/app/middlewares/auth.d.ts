import { NextFunction, Request, Response } from 'express';
type Role = "ARCHITECTURE" | "USER";
declare const auth: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default auth;
//# sourceMappingURL=auth.d.ts.map