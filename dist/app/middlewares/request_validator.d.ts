import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
declare const RequestValidator: (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default RequestValidator;
//# sourceMappingURL=request_validator.d.ts.map