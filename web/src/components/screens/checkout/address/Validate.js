export const _valid_Address = (name, phone, city, district, ward, street ) => {
    // console.log(city, district, ward);
    // console.log(phone);
    
    if(!name || !phone || !city || !district || !ward || !street) return false
    const _valid_Phone = /^(0|\+84)(3[2-9]|5[2-9]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    // console.log(_valid_Phone.test(phone) + 'test');
    
    if(!_valid_Phone.test(phone)) return false
    return true
}