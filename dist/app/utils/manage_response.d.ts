import { Response } from "express";
interface IResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    meta?: {
        page?: number;
        limit?: number;
        skip?: number;
        total?: number;
    };
}
declare const manageResponse: <T>(res: Response, payload: IResponse<T>) => void;
export default manageResponse;
//# sourceMappingURL=manage_response.d.ts.map