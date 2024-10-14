let SpisakNekretnina = function(){
    
    let listaNekretnina = [];
    let listaKorisnika = [];

    let init = function (listaNekretnina, listaKorisnika) {
        this.listaNekretnina = listaNekretnina;
        console.log(listaNekretnina);
        this.listaKorisnika = listaKorisnika;
    }

    let filtrirajNekretnine = function(kriterij){

        let mojaLista = this.listaNekretnina;
        
        if(kriterij.hasOwnProperty('tip_nekretnine')){
            let osobina = kriterij.tip_nekretnine;
            mojaLista = mojaLista.filter(item => item.tip_nekretnine === osobina);
        }
        if(kriterij.hasOwnProperty('min_kvadratura')){
            let osobina = kriterij.min_kvadratura;
            mojaLista = mojaLista.filter(item => item.kvadratura >= osobina);
        }
        if(kriterij.hasOwnProperty('max_kvadratura')){
            let osobina = kriterij.max_kvadratura;
            mojaLista = mojaLista.filter(item => item.kvadratura <= osobina);
        }
        if(kriterij.hasOwnProperty('min_cijena')){
            let osobina = kriterij.min_cijena;
            mojaLista = mojaLista.filter(item => item.cijena >= osobina);
        }
        if(kriterij.hasOwnProperty('max_cijena')){
            let osobina = kriterij.max_cijena;
            mojaLista = mojaLista.filter(item => item.cijena <= osobina);
        }

        return mojaLista;
    }

    let ucitajDetaljeNekretnine = function(id){
        let nekretnina = this.listaNekretnina.find(item => item.id === id);
        return nekretnina;
    }

    return{
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};