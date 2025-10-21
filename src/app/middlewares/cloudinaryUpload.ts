import uploadCloud from "../utils/cloudinary";

// export interface TCloudinaryResponse {
//   url :string;
//   public_id: string;
//   format: string;
//   resource_type: string;
// }
export interface TCloudinaryResponse {
  url: string;
  public_id: string;
  format: string;
  resource_type: string;
}

const cloudinaryUpload = async (req: any, res: any, next: any) => {
  try {
    if (!req.file) {
      return next();
    }

    // Upload to Cloudinary using your utility
    const cloudinaryResponse = await uploadCloud(req.file);

    if (!cloudinaryResponse) {
      return res.status(500).json({
        statusCode: 500,
        success: false,
        message: "Failed to upload file to Cloudinary",
        data: null,
      });
    }

    // ✅ Attach the Cloudinary data to the request
    req.cloudinaryData ={
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
      format: cloudinaryResponse.format,
      resource_type: cloudinaryResponse.resource_type,
    };

    next();
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to upload file to Cloudinary",
      error: error.message,
    });
  }
};

export default cloudinaryUpload;
