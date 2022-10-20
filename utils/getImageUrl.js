export const getImageUrl = (url, userName) => {

    if (!url) {
        if (userName)
            return {
                uri: `https://ui-avatars.com/api/?name=${userName || 'Not+Available'}`
            }
        return { uri: 'https://xsgames.co/randomusers/avatar.php?g=pixel' }
    }
    return { uri: url }

}