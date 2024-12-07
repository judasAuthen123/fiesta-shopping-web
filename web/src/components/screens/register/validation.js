export const validateSignup = (fields) => {
    const { name, phoneNumber, userName, password, confirmPassword } = fields;

    let errors = {};


    if (!name || name.trim() === "") {
        errors.name = {
            errorType: "emptyErr",
            message: { viName: "Bắt buộc", enName: "Required" }
        };
    } else if (name.trim().length > 14) {
        errors.name = {
            errorType: "lengthErr",
            message: { viName: "Không được vượt quá 14 ký tự", enName: "Cannot exceed 14 characters" }
        };
    }


    if (!phoneNumber || phoneNumber.trim() === "") {
        errors.phoneNumber = { errorType: "emptyErr", message: { viName: "Bắt buộc", enName: "Required" } };
    } else if (!/^\d{10}$/.test(phoneNumber)) {
        errors.phoneNumber = { errorType: "formatErr", message: { viName: "Không chính xác", enName: "Incorrect format" } };
    }


    if (!userName || userName.trim() === "") {
        errors.userName = { errorType: "emptyErr", message: { viName: "Bắt buộc", enName: "Required" } };
    } else if (/[^a-zA-Z0-9]/.test(userName)) {
        errors.userName = {
            errorType: "formatErr", message: { viName: "Không thể chứa kí tự", enName: "Must not contain characters" }
        };
    } else if (userName.length < 10) {
        errors.userName = { errorType: "formatErr", message: { viName: "Tối thiểu 10 kí tự", enName: "At least 10 characters" } };
    }


    if (!password || password.trim() === "") {
        errors.password = { errorType: "emptyErr", message: { viName: "Bắt buộc", enName: "Required" } };
    } else if (password.length < 8) {
        errors.password = { errorType: "formatErr", message: { viName: "Tối thiểu 8 kí tự", enName: "At least 8 characters" } };
    }


    if (!confirmPassword || confirmPassword.trim() === "") {
        errors.confirmPassword = { errorType: "emptyErr", message: { viName: "Bắt buộc", enName: "Required" } };
    } else if (confirmPassword !== password) {
        errors.confirmPassword = { errorType: "formatErr", message: { viName: "Mật khẩu không khớp", enName: "Passwords do not match" } };
    }


    return Object.keys(errors).length > 0 ? errors : null;
};