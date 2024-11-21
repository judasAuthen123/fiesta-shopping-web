export const validateSignup = (fields) => {
    const { name, phoneNumber, userName, password, confirmPassword } = fields;

    let errors = {};


    if (!name || name.trim() === "") {
        errors.name = {
            errorType: "emptyErr",
            message: { viName: "Không được bỏ trống", enName: "Name is required" }
        };
    } else if (name.trim().length > 14) {
        errors.name = {
            errorType: "lengthErr",
            message: { viName: "Không được vượt quá 14 ký tự", enName: "Cannot exceed 14 characters" }
        };
    }


    if (!phoneNumber || phoneNumber.trim() === "") {
        errors.phoneNumber = { errorType: "emptyErr", message: { viName: "Không được bỏ trống", enName: "Phone number is required" } };
    } else if (!/^\d{10}$/.test(phoneNumber)) {
        errors.phoneNumber = { errorType: "formatErr", message: { viName: "Vui lòng nhập chính xác", enName: "Please enter the correct format" } };
    }


    if (!userName || userName.trim() === "") {
        errors.userName = { errorType: "emptyErr", message: { viName: "Không được bỏ trống", enName: "Username is required" } };
    } else if (/[^a-zA-Z0-9]/.test(userName)) {
        errors.userName = {
            errorType: "formatErr", message: { viName: "Tên đăng nhập không được chứa ký tự đặc biệt", enName: "Username must not contain special characters" }
        };
    } else if (userName.length < 10) {
        errors.userName = { errorType: "formatErr", message: { viName: "Tên đăng nhập phải ít nhất 10 kí tự", enName: "Username must be at least 10 characters" } };
    }


    if (!password || password.trim() === "") {
        errors.password = { errorType: "emptyErr", message: { viName: "Không được bỏ trống", enName: "Password is required" } };
    } else if (password.length < 8) {
        errors.password = { errorType: "formatErr", message: { viName: "Mật khẩu phải ít nhất 8 kí tự", enName: "Password must be at least 8 characters" } };
    }


    if (!confirmPassword || confirmPassword.trim() === "") {
        errors.confirmPassword = { errorType: "emptyErr", message: { viName: "Không được bỏ trống", enName: "Confirm password is required" } };
    } else if (confirmPassword !== password) {
        errors.confirmPassword = { errorType: "formatErr", message: { viName: "Mật khẩu xác nhận không khớp", enName: "Passwords do not match" } };
    }


    return Object.keys(errors).length > 0 ? errors : null;
};