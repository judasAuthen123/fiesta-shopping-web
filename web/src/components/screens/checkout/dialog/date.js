

export const formatDate = (timestamp) => {

    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = timestamp.getDate();
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();
    return {
        formattedDate: `${day < 10 ? '0'+day : day}/${month < 10 ? '0'+month : month}/${year}`
    }
    

}