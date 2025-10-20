
import multer from "multer";
import path from "path";
import fs from "fs";

// Auto-create uploads folder if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    // console.log('✓ Uploads folder created');
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${timestamp}${ext}`);
    }
});

// File filter
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'video/mp4', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const uploader = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }
});

export default uploader;
