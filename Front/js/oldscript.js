
function ajouter() {
    var classBouton = document.querySelector('p.cBouton');
    classBouton.style.display = 'contents';
    document.querySelector('nav.aBouton').style.display ='none';
}
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



//la fonction retourne un tableau de tdp sans doublons .
function tabCompare(tab1,elem) {
    var i=true;
    while (i) {
        for (let a = 0; a < tab1.length; a++) {
            if (tab1[a].rep==elem.rep) {
                if (tab1[a].reglette==elem.reglette) {
                    if (tab1[a].posission==elem.posission) {
                       i=false;
                        break; 
                    }
                    
                }
            }
            if ((a+1)==tab1.length) {
                    tab1.push(elem);
                    i=false;
                    break;
                }
            
        }
    }
    return tab1;
}
            
function twoDigit(n) {
    return (n < 10 ? '0' : '') + n
}
            
function calcPositionReglette(reglette,repName){
    switch(repName) {
        case 'CHO94': var repTab = tabCho94; break;
  
        case 'CHY94': var repTab = tabChy94; break;

        case 'RAM94': var repTab = tabRam94; break;
        
        case 'IVR94': var repTab = tabIvr94; break;

        case 'VIT94': var repTab = tabVit94; break;

        case 'CAC94': var repTab = tabCac94; break;

        case 'ALF94': var repTab = tabAlf94; break;

        case 'DAU94': var repTab = tabDau94; break;

        case 'FNY94': var repTab = tabFny94; break;

        case 'CRE94': var repTab = tabCre94; break;

        case 'BOS94': var repTab = tabBos94; break;

        case 'DAG94': var repTab = tabDag94; break;

        case 'CPY94': var repTab = tabCpy94; break;

        case 'POM94': var repTab = tabPom94; break;

        case 'CNV94': var repTab = tabCnv94; break;

        case 'VSG94': var repTab = tabVsg94; break;
        
        case 'BSB94': var repTab = tabBsb94; break;
        
        case 'GRA94': var repTab = tabGra94; break;

        default: return [".?.",".?.",".?.",".?."];
    }
    for (let salle = 0; salle < (repTab.length); salle++) {
        for (let rco = 0; rco < (repTab[salle].length); rco++) {
            for (let colone = 0; colone < (repTab[salle][rco].length); colone++) {
                for (let position = 0; position < (repTab[salle][rco][colone].length); position++) {
                    if (repTab[salle][rco][colone][position].length>1) {
                        if (reglette == repTab[salle][rco][colone][position][0]) {
                            return  tab2=[(salle+1),(rco+1),(colone+1),(position+1),(repTab[salle][rco][colone][position][1])];
                        }
                    }else{
                        if (reglette == repTab[salle][rco][colone][position]) {
                            return  tab2=[(salle+1),(rco+1),(colone+1),(position+1),null];                            
                        }
                    }                                    
                }
            }
        }
    }
}
            


/****************************************************************************************************/
// création d'un tableau de coordonnée qui servira de référence pour la conversion de la position du TDP sur la reglette.
//var tabPosissionReferens = [];//tableau des positions références pour la convertion des positions

function tabDesPositions() {
    var i = 0;//incrementeur de tabPosissionReferens
    var tab =[];
    for (var b = 1; b < 17; b++) {
        for (var a = 1; a < 9; a++) {
            tab[i]=[b,a];
            i++;
        }
    } 
    return tab;   
}

            
class Tdpla {
    constructor(nd,rep,reglette,posission,salle,magik,rco,colone,posissionReglette,opt){
        this.nd = parseInt(nd);
        this.rep = String(rep);
        this.reglette = reglette;
        this.posission = posission;
        this.salle = salle;
        this.magik = magik;
        this.rco = rco;
        this.colone = colone;
        this.posissionReglette = posissionReglette;
        this.opt = opt;
    }
}
            
function checheRepLa(texla,MatchPositionTab,a){
    var baieLa =  parseInt(texla.substring((MatchPositionTab[a])-3,(MatchPositionTab[a])-1)); 
    if (baieLa>0){
        var r =  texla.substring((MatchPositionTab[a])-9,(MatchPositionTab[a])-4);
    }else{
        var r =  texla.substring((MatchPositionTab[a])-8,(MatchPositionTab[a])-3);
    }
    switch (r) {
        case 'cho94':break;
        case 'chy94':break;
        case 'bos94':break;
        case 'vit94':break;
        case 'ram94':break;
        case 'cac94':break;
        case 'ivr94':break;
        case 'alf94':break;
        case 'dau94':break;
        case 'fny94':break;
        case 'cre94':break;
        case 'gra94':break;
        case 'cpy94':break;
        case 'pom94':break;
        case 'cnv94':break;
        case 'suc94':break;
        case 'bsb94':break;
        case 'vsg94':break;                
        case 'dag94':break;            
        default:return 'rep??';
    }
    return r;
}      
            
/*
la fonction gereTexLa permet de rechercher les mots clés dans un text passé en argument,
puis elle stoque la position de ces mots clés dans un tableau.
cette fonction va comparer une a une les lettre du texte et les lettres de chaque mot clé.

SI (la PREMIERE lettre du texte = la PREMIERE lette du PREMIER mot clé){
    SI (la SECONDE lettre = la SECONDE letre du PREMIER mot clé){
        SI.... ainsi de suite pour toutes le lettre du mot clé. si on arrive jusqu'a la dernière lettre du mot clé on a une correspodence.
    }SINON{ //on passe au deuxieme mot clé
        SI (la PREMIERE lettre du texte = la PREMIERE lettre du second mot clé)....{

        }SINON{ // on passe au troisieme mo clé
            ... etc...
        }
    }
}SINON{ // on passe a la SECONDE lettre du texte
    Si (La SECONDE lettre du texte = la PREMIERE lettre du PREMIER mot clé)
}
    
*/
function gereTexLa(texla) {
    var z = 0; 
    var x = 0;
    var y = 0;
    var match = 0;
    var tabTdp = [];
    var MatchPositionTab = [];//tab des positions correspondantes a un mot clé trouvé dans le texte.
    const tabATexla = texla.split('');//division du texte par lettre, placée dans un tableau
    const tabMotCle = [ ['L','/','I','N','X'],
                        ['R','/','D','E','G'],
                        ['A','/','T','E','L'],
                        ['T','/','L','I','F']  ]; //les mots recherchés dans le textes (L/INX, R/DEG, A/TEL, T/LIF)
    
    for (var a = 0; a < tabATexla.length; a++) {
        var continie = true;
        x = a;
        while (continie) {
            if (tabATexla[x] === tabMotCle[y][z]) {
                x++;
                z++;
                match++;
                    if (match>4) {
                        match=0;
                        MatchPositionTab.push(a);
                        continie = false; 
                    }
            }else{
                x=a;
                z=0;
                y++;
                match=0;
                if (y>3) {
                    y=0;
                    continie=false;                        
                }  
            }   
        }    
    }               
    for (var a = 0; a < MatchPositionTab.length; a++) {
        var rep =  (checheRepLa(texla,MatchPositionTab,a)).toUpperCase();
        var Tdp = String(texla.substring(MatchPositionTab[a],(MatchPositionTab[a])+10));
        var reglette = Tdp.slice(0,7);
        var posission = Tdp.slice(7,11);
        var magik = tabDesPositions()[parseInt(posission)];
        if (rep!='rep??') {
            var tabInfoRep = calcPositionReglette(reglette,rep);
            if (tabInfoRep!==undefined) {
                var opt = tabInfoRep[4];
                if (tabInfoRep[4]==='I') {
                    var opt = 'INVERSEE';
                } else {
                    if (tabInfoRep[4]==='TNI') {
                        var opt = 'NON ISOLABLE';
                    }else{
                        var opt =null;
                    }
                }
                try {var rco =  tabInfoRep[1];} catch (error){var rco = '1';}
                try {var salle =  tabInfoRep[0];} catch (error){var salle = '1';}
                try {var colone =  tabInfoRep[2];} catch (error){var colone = '...';}
                try {var posissionReglette =  tabInfoRep[3];} catch (error){var posissionReglette = '...';}   
            }else{
                var tabInfoRep = calcPositionReglette(reglette,rep);
                var rco =  '1';
                var salle = '1';
                var colone = 'Position';
                var posissionReglette = 'Inconnue';
            }
                                            
        }else{       
            var tabInfoRep = calcPositionReglette(reglette,rep);
            var rco =  '1';
            var salle = '1';
            var colone = 'Position';
            var posissionReglette = 'Inconnue'; 
        }
        if (tabTdp.length===0) {
            tabTdp.push(new Tdpla((a+1),rep,reglette,posission,salle,magik,rco,colone,posissionReglette,opt)); 
        } else {
            tabTdp = tabCompare(tabTdp,new Tdpla((a+1),rep,reglette,posission,salle,magik,rco,colone,posissionReglette,opt))    
        }
    }
    return tabTdp;
}

async function getClipData(arg){
    const url = `http://tdp.jaffleman.tech:8081/datas?arg=${arg}`
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        return alert("Erreur: Le serveur n'a pas répondu... Contactez le dev")
    }
}
            
function afficheTdpLa(){

    var tabTdp = getClipData((document.getElementById("msg").value));
    if (tabTdp.length===0) {
        alert('Aucun TDP trouvé!');
    }else{
        tabTdp = traitement(tabTdp);
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

}

        
