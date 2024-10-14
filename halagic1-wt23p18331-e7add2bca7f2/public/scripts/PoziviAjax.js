const PoziviAjax = (() => {
    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null
    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        $.ajax({
            type: "GET",
            url: "/korisnik",
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        $.ajax({
            type: "PUT",
            url: "/korisnik",
            data: JSON.stringify(noviPodaci),
            contentType: "application/json",
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        $.ajax({
            type: "POST",
            url: "/upit",
            data: JSON.stringify({nekretnina_id: nekretnina_id, tekst_upita: tekst_upita}),
            contentType: "application/json",
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    function impl_getNekretnine(fnCallback) {
        $.ajax({
            type: "GET",
            url: "/nekretnine",
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    function impl_postLogin(username, password, fnCallback) {
        $.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify({username: username, password: password}),
            contentType: "application/json",
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    function impl_postLogout(fnCallback) {
        $.ajax({
            type: "POST",
            url: "/logout",
            contentType: "application/json",
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    function impl_getNekretninaById(nekretnina_id, fnCallback){
        $.ajax({
            type: "GET",
            url: "/nekretnina/" + nekretnina_id,
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    function impl_getKorisnikById(korisnik_id, fnCallback){
        $.ajax({
            type: "GET",
            url: "/korisnik/" + korisnik_id,
            success: (response) => {
                fnCallback(null, response);
            },
            error: (error) => {
                fnCallback(error, null);
            }
        })
    }
    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        getNekretninaById: impl_getNekretninaById,
        getKorisnikById: impl_getKorisnikById
    };
})();