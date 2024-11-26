export const validateLogin = (fields) => {
    const { userName, password } = fields
    let errors = {}
    if (!userName || userName.trim() === "") {
        errors.userName = {
            errType: "emptyErr",
            message: {
                viName: "Vui lòng điền thông tin",
                enName: "Please fill information"
            }
        }
    }
    if (!password || password.trim() === "") {
        errors.password = {
            errType: "emptyErr",
            message: {
                viName: "Vui lòng điền thông tin",
                enName: "Please fill information"
            }
        }
    }
    return Object.keys(errors).length > 0 ? errors : null
}