

const getNotifications = (user_id) =>{
    return {
        type : "get_Notifications",
        user_id : user_id
    }
}

export default getNotifications;