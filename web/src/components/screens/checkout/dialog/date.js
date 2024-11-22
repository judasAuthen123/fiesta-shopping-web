

export const formatDate = (timestamp) => {
    const monthArr = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const newData = new Date(timestamp)
    const year = newData.getFullYear();
    const month = newData.getMonth();
    const day = newData.getDate();
    const hours = newData.getHours();
    const minutes = newData.getMinutes();
    return {
        formattedDate: `${day < 10 ? '0' + day : day} ${monthArr[month]} ${year}`,
        formattedTime: `${hours < 12 ? hours : hours - 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours < 12 ? 'AM' : 'PM'}`
    }

}