const returnSuccess = (res, msg = "", code = 200, data = {}) => {
    let resObject = { success: true, msg, data };
    msg === "" ? delete resObject.msg : null;
    data == {} ? delete resObject.data : null;

    return res.status(code).json(resObject);
};

const returnError = (res, msg = "", code, errors = {}) => {
    errors = errors.array().map((err) => ({
        [err.path]: err.msg,
    }));
    let resObject = { success: false, msg, errors };

    msg === "" ? delete resObject.msg : null;
    errors == {} ? delete resObject.errors : null;

    return res.status(code).json(resObject);
};

export { returnSuccess, returnError };
