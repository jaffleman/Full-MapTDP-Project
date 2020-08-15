
function ajouter() {
    var classBouton = document.querySelector('p.cBouton');
    classBouton.style.display = 'contents';
    document.querySelector('nav.aBouton').style.display ='none';
}

function twoDigit(n) {
    return (n < 10 ? '0' : '') + n
}
/*
function traitement(tab){
    var tabRep = repSearch(tab);
    var tabTrie = trieTdpXrep(tab,tabRep);
    var tabSalle = seachSalleXrep(tabTrie,tabRep);
    return shortTdpRepSalle(tabTrie,tabSalle,tabRep);
    
}
function repSearch(tab) {
    //recherche des rep
    var tabRep=[];
    var repMatch=false;
    for (let i = 0; i < tab.length; i++) {
        if (tabRep.length===0) {
            tabRep.push(tab[i].rep);
        }else{
            for (let index = 0; index<tabRep.length; index++){
                if (tabRep[index]===tab[i].rep) {
                    repMatch=true; break;
                }
            }
            if (repMatch) {
                repMatch=false;
            }else{
                tabRep.push(tab[i].rep);
            }
        }
    }  
    return tabRep;  
}

function trieTdpXrep(tab,tab2) {// tab = tableau de tdp, tab2= tableau de Rep
    var tabTrie= [];
    for (let i = 0; i < tab2.length; i++) {
        for (let y = 0; y < tab.length; y++) {
            if (tab2[i]==tab[y].rep) {
                tabTrie.push(tab[y]);
            }
        } 
    }
    return tabTrie; 
}

function seachSalleXrep(tab,tab2) {//tab = tab de Tdp trié, tab2 = tab de rep
    var tabSalle = []; 
    var salleMatch = false;  
    for (let a = 0; a < tab2.length; a++) {
        var tabS =[];
        for (let b = 0; b < tab.length; b++) {
            if (tab2[a]===tab[b].rep) {
                if (tabS.length===0) {
                    tabS.push(tab[b].salle);
                }else{
                    for (let index = 0; index<tabS.length; index++){
                        if (tabS[index]===tab[b].salle) {
                            salleMatch = true; break;
                        }
                    }
                    if (salleMatch) {
                        salleMatch = false;
                    }else{
                        tabS.push(tab[b].salle);
                    }
                }    
            }        
        }
        tabSalle.push(tabS);            
    } 
    return tabSalle;
}

function shortTdpRepSalle(tab,tab2,tab3){// tab3 = tab de rep, tab2 = tab de salle, tab = tab de Tdp trié
    //trie des tdp par rep puis par salle
    var newTab=[];
    for (let d = 0; d < tab3.length; d++) {
        for (let f = 0; f < tab2[d].length; f++) { 
          
		    for (let g = 1; g < 3; g++){
                 for (let e = 0; e < tab.length; e++) {
                    if (tab[e].rep===tab3[d]){
                        if (tab[e].salle=== f+1) {
                            if (tab[e].rco=== g) {
                                newTab.push(tab[e]);
                            }
			
                        }                    
                    }
                }   
                
            }
       
        }    
    }
    return newTab;
}

*/

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