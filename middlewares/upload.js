import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory, not disk directly

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Invalid file type. Only JPEG, PNG,jpg ,WebP, and GIF allowed.",
            ),
            false,
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
        files: 1, // max 1 file per request
    },
});

export default upload;
