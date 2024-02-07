const mongo = require('../services/mongoDB/mongoDB');

const createUser = (req, res) => {
    const data = req.body;
    let username = data['username'];
    let email_addr = data['email_addr'];
    let game_id_list = data['game_id_list'];

    mongo.createNewUser(username, email_addr, game_id_list)
        .then(empty => {
            res.send("new user created");
        })
        .catch (error => {
            console.error('Create New User Error:', error);
            res.status(500).send('Internal Server Error');
        });
}

const deleteProfiles = (req, res) => {
    const data = req.body;
    let user_id_list = data['user_id'];
    mongo.removeUsers(user_id_list)
        .then(empty => {
            if (user_id_list.length > 1) {
                res.send('users removed');
            }
            else {
                res.send('user removed');
            }
        })
        .catch(error => {
            console.error('Remove Users Error:', error);
            res.status(500).send('Internal Server Error');
        });
    res.send("users removed");
}

const userProfile = (req, res) => {
    const data = req.body;
    let username = data['username'];
    let user_id = data['user_id'];

    mongo.getProfile(username, user_id)
        .then(profile => {
            res.send(profile);
        })
        .catch(error => {
            console.error('Get User Profile Error:', error);
            res.status(500).send('Internal Server Error');
        });
}

const userList = (req, res) => {
    mongo.getUserList()
        .then(user_list => {
            res.send(user_list);
        })
        .catch(error => {
            console.error('Get User List Error:', error);
            res.status(500).send('Internal Server Error');
        });
}
const GameList = (req, res) => {
    mongo.getGamesFromCatalog()
    .then(game_list => {
        res.send(game_list);
    })
    .catch(error => {
        console.error('Get Game List Error:', error);
        res.status(500).send('Internal Server Error');
    });
}

const addUserGames = (req, res) => {
    const data = req.body;
    let user_id = data['user_id'];
    let game_id_list = data['game_id_list'];
    mongo.addGamesToUser(user_id, game_id_list)
        .then(msg => {
            res.send('Games Added To User Successfully');
        })
        .catch(error => {
            console.error('Add User Games Error:', error);
            res.status(500).send('Internal Server Error');
        });
}
const removeUserGames = (req, res) => {
    const data = req.body;
    let user_id = data['user_id'];
    let game_id_list = data['game_id_list'];
    mongo.removeGamesFromUser(user_id, game_id_list)
        .then(msg => {
            res.send('Games Added To User Successfully');
        })
        .catch(error => {
            console.error('Remove User Games Error:', error);
            res.status(500).send('Internal Server Error');
        });
}

const addGameToCatalog = (req, res) => {
    const data = req.body;
    let game_name = data['game_name'];
    let game_score = data['game_score'];
    mongo.introduceGameToCatalog(game_name, game_score)
        .then(msg => {
            res.send('Games Added To Catalog Successfully');
        })
        .catch(error => {
            console.error('Add Games To Catalog Error:', error);
            res.status(500).send('Internal Server Error');
        });
}

const removeCatalogGames = (req, res) => {
    const data = req.body;
    let game_id_list = data['game_id_list'];
    mongo.removeGames(game_id_list)
    .then(msg => {
        res.send('Games Removed From Catalog Successfully');
    })
    .catch(error => {
        console.error('Remove Games From Catalog Error:', error);
        res.status(500).send('Internal Server Error');
    });
} 

module.exports = {
    addUserGames,
    removeUserGames,
    addGameToCatalog,
    removeCatalogGames,
    createUser,
    deleteProfiles,
    userProfile,
    GameList,
    userList
}