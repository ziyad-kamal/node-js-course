import multer from "multer";

const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                success: false,
                msg: "Maximum allowed file size is 5MB",
            });
            /*
            req.flash('errors', {
            image: { msg: 'File too large. Maximum allowed size is 5MB.' }
        });

      */
        }

        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                success: false,
                msg: "Unexpected field or too many files uploaded",
            });
        }

        if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                success: false,
                msg: "Too many files uploaded",
            });
        }

        return res.status(400).json({
            success: false,
            msg: "Upload failed",
        });
    }

    next(err);
};

export default errorHandler;
