function popuniDetalje(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    PoziviAjax.getNekretninaById(id, async (err, response) => {
        if(err){
            console.log(err);
        }else{
            console.log(response);
            document.getElementById("osnovni_naziv").innerHTML = "<strong>Naziv: </strong>"+ response.nekretnina.naziv;
            document.getElementById("osnovna_kvadratura").innerHTML = "<strong>Kvadratura: </strong>"+ response.nekretnina.kvadratura + "m2";
            document.getElementById("osnovna_cijena").innerHTML = "<strong>Cijena: </strong>"+ response.nekretnina.cijena + "KM";
            document.getElementById("detalji_grijanje").innerHTML = "<strong>Tip grijanja: </strong>"+ response.nekretnina.tip_grijanja;
            document.getElementById("detalji_godina_izgradnje").innerHTML = "<strong>Godina izgradnje: </strong>"+ response.nekretnina.godina_izgradnje +".";
            document.getElementById("detalji_lokacija").innerHTML = "<strong>Lokacija: </strong>"+ response.nekretnina.lokacija;
            document.getElementById("detalji_datum_objave").innerHTML = "<strong>Datum objave: </strong>"+ response.nekretnina.datum_objave;
            document.getElementById("detalji_opis").innerHTML = "<strong>Opis: </strong>"+ response.nekretnina.opis;
            
            for(var i=0; i<response.upiti.length; i++){
                let currentIndex = i;
                console.log(response.upiti[currentIndex]);
                PoziviAjax.getKorisnikById(response.upiti[currentIndex].KorisnikId, (err2, resp2) => {
                    if(err2){
                        console.log(err2);
                    }else{
                        let upitiWrapper = document.createElement("li");
                        let paragraf_username = document.createElement("p");
                        paragraf_username.innerHTML = "<strong>"+resp2+"</strong>";
                        let paragraf_tekst = document.createElement("p");
                        paragraf_tekst.innerHTML = response.upiti[currentIndex].tekst_upita;

                        upitiWrapper.appendChild(paragraf_username);
                        upitiWrapper.appendChild(paragraf_tekst);
                        document.getElementById("upiti_lista").appendChild(upitiWrapper);
                    }

                });
            }
            
        }
    });
}
