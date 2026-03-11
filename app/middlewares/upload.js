import multer from "multer";

const storage = multer.memoryStorage();

const createUploader = (maxBytes) =>
    multer({
        storage,
        limits: {
            fileSize: maxBytes,
            files: 1,
        },
    });

const uploadImage = createUploader(5 * 1024 * 1024); // 5 MB
const uploadDocument = createUploader(10 * 1024 * 1024); // 10 MB
const uploadVideo = createUploader(50 * 1024 * 1024); // 50 MB

export { uploadImage, uploadDocument, uploadVideo };
