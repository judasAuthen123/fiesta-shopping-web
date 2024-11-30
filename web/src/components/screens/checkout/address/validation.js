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
                viName: "Vui lòng chọn đủ thông tin",
                enName: "Please select complete information"
            }
        }
    }
    if (!name) {
        err.name = {
            typeErr: "emptyErr",
            message: {
                viName: "Không được bỏ trống",
                enName: "Name is required"
            }
        }
    }
    if (!phoneNumber) {
        err.phone = {
            typeErr: "emptyErr",
            message: {
                viName: "Không được bỏ trống",
                enName: "Phone number is required"
            }
        }
    } else if (!/^\d{10}$/.test(phoneNumber)) {
        err.phone = { errorType: "formatErr", message: { viName: "Không hợp lệ", enName: "Invalid phone number" } };
    }
    if (!street) {
        err.street = {
            typeErr: "emptyErr",
            message: {
                viName: "Không được bỏ trống",
                enName: "Street is required"
            }
        }
    }
    return Object.keys(err).length > 0 ? err : null
}