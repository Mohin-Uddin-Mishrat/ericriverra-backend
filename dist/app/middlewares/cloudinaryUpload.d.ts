export interface TCloudinaryResponse {
    url: string;
    public_id: string;
    format: string;
    resource_type: string;
}
declare const cloudinaryUpload: (req: any, res: any, next: any) => Promise<any>;
export default cloudinaryUpload;
//# sourceMappingURL=cloudinaryUpload.d.ts.map