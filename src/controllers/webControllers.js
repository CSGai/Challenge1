const createNewUser = (req, res) => {
    res.send("new user created");
}

const removeUser = (req, res) => {
    res.send("user removed");
}

const getUserInfo = (req, res) => {
    res.send("{insrt user info here}");
}

const getUserList = (req, res) => {
    res.send("{insert user list here}");
}

const getMainPage = (req, res) => {
    res.send("{main page here}");
}

module.exports = {
    createNewUser,
    removeUser,
    getUserInfo,
    getUserList,
    getMainPage
}