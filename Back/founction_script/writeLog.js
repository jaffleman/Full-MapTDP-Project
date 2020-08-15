const fs = require('fs');

module.exports = { 
    log: (msgLog)=>{
        fs.readFile('./log.txt', (err, data) => {
            if (err) {
                throw err;
            }
            fs.writeFile('./log.txt', data+'\n'+msgLog, function(err) {if (err) {
                console.log("Erreur d'ecriture du fichier au demarrage")
            }})
        })        
    },

    time: () => {
        const date = new Date();
        return("["+date.getHours()+":"+date.getMinutes()+"] ")
    }
}