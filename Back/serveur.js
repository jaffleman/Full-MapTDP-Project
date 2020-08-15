let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let texteFunction = require('./founction_script/gestionTexte')
let myFileLog = require("./founction_script/writeLog") 
const { json } = require('body-parser')


//Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Routes
app.get('/datas', (request, response)=>{
    const h = myFileLog.time();    
    const responseObj = {
        status:0,
        msg:'',
        value:{}
    }
    
    console.log('server.js: reception des données')
    if (request.query.arg === '') {
        responseObj.status = 100
        responseObj.msg = "NO DATA: Aucune donnée dans le presse-papier! Veuillez copier votre liste de TDP."
    }else{  
        const demande = request.query.arg
        let lesTdp = texteFunction.process(demande)
        if (lesTdp === null) {
            responseObj.status = 200;
            responseObj.msg = "NO TDP: Aucun TDP n'a été trouver! Veuillez copier votre liste de TDP."
            lesTdp = responseObj.msg;
        }else{
            console.log('server.js: lancement du traitement des données...')
            responseObj.status  = 300;
            responseObj.msg = 'OK'  
            responseObj.value = texteFunction.traitement(lesTdp)
            console.log(responseObj)
        } 
        myFileLog.log(h+responseObj.status+" => [DEMANDE: "+demande+"] [REPONSE:"+ responseObj.msg+"]")  //Trace log de la demande    
    }
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.json(responseObj)
})
   
app.listen(8081, () => {
    console.log("Serveur demarrer et en ecoute sur le port 8081");
    myFileLog.log(myFileLog.time()+'== DEMARRAGE DU SERVEUR =>>'); //Trace log du demarrage
}) 
