export const _valid_Address = (name, phone, city, district, ward, street) => {
    // console.log(city, district, ward);
    // console.log(phone);

    if (!name || !phone || !city || !district || !ward || !street) return false
    return true
}