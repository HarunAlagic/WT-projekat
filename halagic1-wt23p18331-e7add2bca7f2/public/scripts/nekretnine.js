function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    //pozivanje metode za filtriranje
    let lista = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine});
    
    //iscrtavanje elemenata u divReferenca element
    let naslov = document.createElement("h3");
    naslov.innerText = tip_nekretnine;
    divReferenca.appendChild(naslov);
    if(lista.length != 0){
        let nekretnineWrapper = document.createElement("div");
        nekretnineWrapper.setAttribute('class', 'nekretnine');

        for(let i=0; i<lista.length; i++){
            let tipNekretnine = document.createElement("div");
            tipNekretnine.setAttribute('class', lista[i].tip_nekretnine);
            let slika = document.createElement('img');
            slika.setAttribute('src', '../Slika_nekretnine_front.jpeg');
            let naziv = document.createElement("div");
            naziv.setAttribute('id', 'naziv');
            naziv.innerText = "Naziv: " + lista[i].naziv;
            let kvadratura = document.createElement("div");
            kvadratura.setAttribute('id', 'kvadratura');
            kvadratura.innerText = "Kvadratura: " + lista[i].kvadratura + " m2";
            let cijena = document.createElement("div");
            cijena.setAttribute('id', 'cijena');
            cijena.innerText = "Cijena: " + lista[i].cijena + " KM";
            let dugme = document.createElement("div");
            dugme.setAttribute('id', 'dugme');
            let dugmence = document.createElement('button');
            dugmence.innerText = 'Detalji';
            
            let lokacija = document.createElement("div");
            lokacija.setAttribute('id', 'lokacija');
            lokacija.innerText = "Lokacija: " + lista[i].lokacija;
            lokacija.style="visibility:hidden";
            let godina_izgradnje = document.createElement("div");
            godina_izgradnje.setAttribute('id', 'godina_izgradnje');
            godina_izgradnje.innerText = "Godina izgradnje: " + lista[i].godina_izgradnje + ".";
            godina_izgradnje.style="visibility:hidden";
            let dugme_2 = document.createElement("div");
            dugme_2.setAttribute('id', 'dugme_2');
            let dugmence_2 = document.createElement('button');
            dugmence_2.innerText = 'Otvori detalje';
            dugmence_2.style="visibility:hidden";
            dugmence.addEventListener("click", function(){
                dugmence_2.style="visibility:visible";
                lokacija.style="visibility:visible";
                godina_izgradnje.style="visibility:visible";
            });
            dugmence_2.addEventListener("click", function(){
                location.href = "http://localhost:3000/detalji.html?id=" + lista[i].id;
            });
            dugme.appendChild(dugmence);
            dugme_2.appendChild(dugmence_2);
            tipNekretnine.appendChild(slika);
            tipNekretnine.appendChild(naziv);
            tipNekretnine.appendChild(kvadratura);
            tipNekretnine.appendChild(cijena);
            tipNekretnine.appendChild(dugme);
            tipNekretnine.appendChild(lokacija);
            tipNekretnine.appendChild(godina_izgradnje);
            tipNekretnine.appendChild(dugme_2);

            nekretnineWrapper.appendChild(tipNekretnine);
        }
        divReferenca.appendChild(nekretnineWrapper);
    }
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

let nekretnine = SpisakNekretnina();

let listaNekretnina = []
PoziviAjax.getNekretnine( (err, data) =>{
    if(err){
        console.log(err);
    }
    else if(data.nekretnine.length>0){
        nekretnine.init(data.nekretnine,[]);
        spojiNekretnine(divStan, nekretnine, "Stan");
        spojiNekretnine(divKuca, nekretnine, "Kuća");
        spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
    }
}
);

