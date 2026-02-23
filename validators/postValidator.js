// src/validators/postValidator.js
import { body, validationResult } from "express-validator";

export const postValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2, max: 120 })
        .withMessage("Title must be between 3 and 120 characters"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 2 })
        .withMessage("Content must be at least 10 characters long"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 2 })
        .withMessage("Content must be at least 10 characters long"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.mapped());
            req.flash("old", req.body);
            return res.redirect("/users/post/create");
        }
        next();
    },
];
