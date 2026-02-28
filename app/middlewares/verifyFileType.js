import { fileTypeFromBuffer } from "file-type";

export const verifyFileType = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
        // or for forms: req.flash('error', 'No file');
    }

    try {
        const detected = await fileTypeFromBuffer(req.file.buffer);

        if (!detected) {
            return res
                .status(400)
                .json({ error: "Unable to detect file type" });
        }

        const allowed = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

        if (!allowed.has(detected.ext)) {
            return res.status(400).json({
                error: `Invalid file content. Detected: ${detected.mime} (${detected.ext}), allowed: images only`,
            });
        }

        req.realFileType = detected;

        next();
    } catch (err) {
        console.error("File type detection error:", err);
        return res.status(500).json({ error: "File processing failed" });
    }
};
