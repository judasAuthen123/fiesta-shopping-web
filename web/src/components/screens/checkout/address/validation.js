export const validationAddress = (fields) => {
    const {
        city,
        district,
        ward,
        name,
        phoneNumber,
        street } = fields

    let err = {}
    if (!city || !district || !ward) {
        err.detailAddress = {
            typeErr: "emptyErr",
            message: {
                viName: "Thiếu thông tin",
                enName: "Missing information"
            }
        }
    }
    if (!name) {
        err.name = {
            typeErr: "emptyErr",
            message: {
                viName: "Bắt buộc",
                enName: "Required"
            }
        }
    }
    if (!phoneNumber) {
        err.phone = {
            typeErr: "emptyErr",
            message: {
                viName: "Bắt buộc",
                enName: "Required"
            }
        }
    } else if (!/^\d{10}$/.test(phoneNumber)) {
        err.phone = { errorType: "formatErr", message: { viName: "Không hợp lệ", enName: "Invalid" } };
    }
    if (!street) {
        err.street = {
            typeErr: "emptyErr",
            message: {
                viName: "Bắt buộc",
                enName: "Required"
            }
        }
    }
    return Object.keys(err).length > 0 ? err : null
}