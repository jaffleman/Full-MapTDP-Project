
function ajouter() {
    var classBouton = document.querySelector('p.cBouton');
    classBouton.style.display = 'contents';
    document.querySelector('nav.aBouton').style.display ='none';
}

function twoDigit(n) {
    return (n < 10 ? '0' : '') + n
}

async function getClipData(arg){
    const url = `http://tdp.jaffleman.tech:8081/datas?arg=${arg}`
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        return alert("Erreur: Le serveur n'a pas répondu... Contactez le dev.")
    }
}


function checkReponsLa(res){
    switch (res.status) {
        case 200:
            alert('Aucun TDP trouvé dans le texte que vous avez collé!');
            break;
        case 300:
            gereDonneLa(res)
            break;
    }
}











    
        
function gereDonneLa(res){
    //let tabTdp = traitement(res.value);
    let tabTdp = res.value;
    var titreRep;
    var titreSalle;
    var titreRco;
    
    document.querySelector('p.cBouton').style.display = 'none';
    document.querySelector('nav.aBouton').style.display = 'flex';
    document.getElementById('tdp').innerHTML = "";  
    for (let i = 0; i < tabTdp.length; i++) {
        if (titreRep===null) {
            titreRep = tabTdp[i].rep;
            titreSalle = tabTdp[i].salle;
            titreRco = tabTdp[i].rco;
            document.getElementById('tdp').innerHTML += "<h3>REPARTITEUR DE "+tabTdp[i].rep+"</h3>";
            document.getElementById('tdp').innerHTML += "<h4>Salle: "+tabTdp[i].salle+"</h4>";
            document.getElementById('tdp').innerHTML += "<h5>rco: "+tabTdp[i].rco+"</h5>";
        }else{
            if (titreRep!=tabTdp[i].rep) {
                titreRep = tabTdp[i].rep;
                titreSalle = tabTdp[i].salle;
                titreRco = tabTdp[i].rco;
                document.getElementById('tdp').innerHTML += "<h3>REPARTITEUR DE "+tabTdp[i].rep+"</h3>";
                document.getElementById('tdp').innerHTML += "<h4>Salle:"+tabTdp[i].salle+"</h4>";
                document.getElementById('tdp').innerHTML += "<h5>rco: "+tabTdp[i].rco+"</h5>";
            }
        }
        if (titreSalle!=tabTdp[i].salle) {
            titreSalle = tabTdp[i].salle;
            titreRco = tabTdp[i].rco;
            document.getElementById('tdp').innerHTML += "<h4>Salle:"+tabTdp[i].salle+"</h4>";
            document.getElementById('tdp').innerHTML += "<h5>rco: "+tabTdp[i].rco+"</h5>";
        }
        else{
            if (titreRco!=tabTdp[i].rco) {
                titreRco = tabTdp[i].rco;
                document.getElementById('tdp').innerHTML += "<h5>rco:"+tabTdp[i].rco+"</h5>";                    
            }
        }
        if (tabTdp[i].opt===null) {
            document.getElementById('tdp').innerHTML += "<div class=Letes id=tdp"+i+"><p class='tdp'><strong>"+twoDigit(tabTdp[i].nd)+"</strong>/"+tabTdp.length+" => <strong><u>"+tabTdp[i].reglette+" "+tabTdp[i].posission+"</u></spam></strong><br><p class='info'>Coordonées: [<strong>"+tabTdp[i].colone+"-"+tabTdp[i].posissionReglette+"</strong>][<strong>"+tabTdp[i].magik+"</strong>]<br><strong>"+tabTdp[i].rep+"</strong> Salle:[<strong>"+tabTdp[i].salle+"</strong>] rco:[<strong>"+tabTdp[i].rco+"</strong>]</div>";
        }else{
            if (tabTdp[i].opt==='INVERSEE') {
            document.getElementById('tdp').innerHTML += "<div class=Letes id=tdp"+i+"><p class='tdp'><strong>"+twoDigit(tabTdp[i].nd)+"</strong>/"+tabTdp.length+" => <strong><u>"+tabTdp[i].reglette+" "+tabTdp[i].posission+"</u><br><spam class='optI'>"+tabTdp[i].opt+"</spam></strong><br><p class='info'>Coordonées: [<strong>"+tabTdp[i].colone+"-"+tabTdp[i].posissionReglette+"</strong>][<strong>"+tabTdp[i].magik+"</strong>]<br><strong>"+tabTdp[i].rep+"</strong> Salle:[<strong>"+tabTdp[i].salle+"</strong>] rco:[<strong>"+tabTdp[i].rco+"</strong>]</div>";
            }else{
                document.getElementById('tdp').innerHTML += "<div class=Letes id=tdp"+i+"><p class='tdp'><strong>"+twoDigit(tabTdp[i].nd)+"</strong>/"+tabTdp.length+" => <strong><u>"+tabTdp[i].reglette+" "+tabTdp[i].posission+"</u><br><spam class='optTNI'>"+tabTdp[i].opt+"</spam></strong><br><p class='info'>Coordonées: [<strong>"+tabTdp[i].colone+"-"+tabTdp[i].posissionReglette+"</strong>][<strong>"+tabTdp[i].magik+"</strong>]<br><strong>"+tabTdp[i].rep+"</strong> Salle:[<strong>"+tabTdp[i].salle+"</strong>] rco:[<strong>"+tabTdp[i].rco+"</strong>]</div>";
            }
        }
    }

    var elements = document.querySelectorAll('.Letes');
    var pre2=null;
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click',function (e) {
            if (pre2===null) {
                this.querySelector('p.info').style.display = 'contents';
                this.style.backgroundColor = '#ffffffff';
                pre2 = this;    
            }else{
                if (this.querySelector('p.info').style.display!=='contents') {
                    pre2.querySelector('p.info').style.display = 'none';
                    pre2.style.backgroundColor = '#a1a1a1';
                    this.style.backgroundColor = '#ffffffff';
                    this.querySelector('p.info').style.display = 'contents';
                    pre2 = this;   
                }else{
                    this.querySelector('p.info').style.display = 'none';
                    this.style.backgroundColor = '#e27b64d4';
                    pre2 = null; 
                }

            }                      
        })
                    
    }
}
    


            
function afficheTdpLa(){
    const msg = document.getElementById("msg").value;
    if (msg.length < 1) {
        alert ('Vous devez copier/coller votre liste de TDP dans la zone de texte...')
    } else {
        getClipData(msg)
        .then((res)=>{
            checkReponsLa(res);
        })    
    }
}