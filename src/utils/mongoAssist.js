const { exec } = require('child_process');
const { MongoClient } = require("mongodb");
require('dotenv/config');

const uri = "mongodb://" + process.env.IP + ":" + process.env.MONGOPORT;
const client = new MongoClient(uri);

const database = client.db("Challenge1");

//collection setup
const gameInfo = database.collection("gameInfo");
const userInfo = database.collection("userInfo");
const userGameInfo = database.collection("userGameInfo");

const databaseCollections = {clientt:client,
                            gameInfoo:gameInfo,
                            userInfoo:userInfo,
                            userGameInfoo:userGameInfo}


// function execCommand(script, complete_msg=null) {
//       console.log(`executing batch: ${script}`);
//       //executes promise (script in this case)
//       const process = exec(`cmd /c ${script}`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing the batch script: ${error}`);
//         }
//       });
//       //hadnles exit codes
//       process.on('exit', (code, signal) => {
//         console.log(`Child process exited with code ${code} and signal ${signal}`);
//     });
//     if (complete_msg != null) {console.log(complete_msg);}
// }

async function execCommand(script, complete_msg = null) {
    console.log(`executing batch: ${script}`);
    try {
        const result = await new Promise((resolve, reject) => {
            const process = exec(`cmd /c ${script}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing the batch script: ${error}`);
                    reject(error);
                }
                else {
                    resolve(stdout);
                }
            });
            process.on('exit', (code, signal) => {
                console.log(`Child process exited with code ${code} and signal ${signal}`);
            });
        });
        if (complete_msg !== null) {
            console.log(complete_msg);
        }
        return result;
    } catch (error_1) {
        console.error('Error executing the command:', error_1);
        throw error_1;
    }
}

function getIDFromDB(allDocuments) {
    const id_list = {};
    if (allDocuments != {}) {
        for (const document of allDocuments) {
            let game_id = document.game_id;
            let game_name = document.game_name;
            if (game_id != undefined){
                id_list[game_name] = game_id;
            }   
        }
        return id_list;
    } 
    else {
        throw new Error('games not found');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function gameListSetup(list, lowerList=true) {
    list = Array.isArray(list)? list : [list];
    if (lowerList) {
        list = list.map((gameName) => gameName.toLowerCase().replace(/ /g, '_'));
    }
    return list;
}


function toExtract(documents, tbe) {
    var temp = [];
    documents.forEach(document => {
        temp.push(document[tbe]);
    });

    return temp;
}

module.exports = {
    execCommand,
    getIDFromDB,
    isValidEmail,
    gameListSetup,
    toExtract,
    databaseCollections
}