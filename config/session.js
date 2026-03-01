import "dotenv/config";

const sessionConfig = {
    config: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        },
    },
};

const flashSession = (req, res, next) => {
    const errors = req.flash("errors")[0] || {};
    const old = req.flash("old")[0] || {};
    const error = req.flash("error") || [];
    const success = req.flash("success") || [];

    res.locals.messages = {
        errors,
        old,
        error,
        success,
    };

    next();
};

export { sessionConfig, flashSession };
