const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('./baza.js');


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/scripts'));
app.use(express.static(__dirname + '/public/'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

const Korisnik = require('./model/korisnik.js')(sequelize);
const Nekretnina = require('./model/nekretnina.js')(sequelize);
const Upit = require('./model/upit.js')(sequelize);
Nekretnina.hasMany(Upit, {as:'upiti'});
Korisnik.hasMany(Upit, {as:'upiti'});

Upit.belongsTo(Nekretnina);
Nekretnina.sync();
Upit.sync();
Korisnik.sync();


Array.prototype.forEachAsync = async function (fn) {
    for (let t of this) {
        await fn(t)
    }
}


app.post('/login', async function(req, res){
    let tijelo = req.body;

    let korisnik = await Korisnik.findOne({where: {username: tijelo.username} });
    if(korisnik != null && bcrypt.compareSync(tijelo.password, korisnik.password)){
        req.session.username = tijelo.username;
        req.session.korisnik_id = korisnik.id;
        console.log(req.session.korisnik_id);
        res.status(200).json({"poruka":"Uspješna prijava"});
    }
    else{
        res.status(401).json({"greska":"Neuspješna prijava"});
    }
});

app.post('/logout', function(req, res){
    let tijelo = req.body;
    if(req.session.username == null){
        res.status(401).json({"greska":"Neautorizovan pristup"});
        return;
    }
    req.session.username = null;
    res.status(200).json({"poruka":"Uspješno ste se odjavili"});
    
});

app.get('/korisnik', async function(req, res){
    if(req.session.username == null){
        res.status(401).json({"greska":"Neautorizovan pristup"});
        return;
    }
    let korisnik = await Korisnik.findOne({where: {username: req.session.username}});
    if(korisnik != null){
        res.status(200).json(korisnik);
    }
});

app.post('/upit', async function(req, res){
    if(req.session.username == null){
        res.status(401).json({"greska":"Neautorizovan pristup"});
        return;
    }
    let tijelo = req.body;
    let nekretnina = await Nekretnina.findOne({where: {id: tijelo.nekretnina_id}});
    console.log(req.session.id);
    if(nekretnina == null){
        res.status(400).json({"greska":"Nekretnina sa id-em " + tijelo.nekretnina_id + " ne postoji"});
    }
    else{
        let upit = Upit.build({ tekst_upita: tijelo.tekst_upita,
            NekretninaId: tijelo.nekretnina_id,
            KorisnikId: req.session.korisnik_id
            });
        upit.save().then(function () {
            res.status(200).json({"poruka":"Upit je uspješno dodan"});
        });
    }
});

app.put('/korisnik', async function(req, res){
    if(req.session.username == null) res.status(401).json({"greska":"Neautorizovan pristup"});
    let tijelo = req.body;
    let korisnik = await Korisnik.findOne({where: {username: req.session.username}});

    korisnik.update(tijelo).then(function(){
        res.status(200).json({"poruka":"Podaci su uspješno ažurirani"});
    })
});

app.get('/nekretnine', function(req, res){
    let nekretnine = [];
    Nekretnina.findAll().then(function (nekretnine){
            res.status(200).json({
                nekretnine
            });
    })
});

app.get('/korisnik/:id', async function(req, res){
    let korisnik = await Korisnik.findOne({where: {id: req.params.id}});
    if(korisnik != null){
        res.status(200).json(korisnik.username);
    }
    else{
        res.status(400).json({"greska":"Korisnik sa id-em " + req.params.id + " ne postoji"});
    }
});

app.get('/nekretnina/:id', async function(req, res){
    let nekretnina = await Nekretnina.findOne({where: {id: req.params.id}});
    let upiti = await Upit.findAll({where: {nekretninaId: req.params.id}});
    if(nekretnina != null){
        if (!nekretnina.hasOwnProperty('upiti')) {
            nekretnina.upiti = [];
        }

        const combinedResponse = {
            nekretnina,
            "upiti": upiti
        };
        res.status(200).json(
            combinedResponse
            
        );
    }
    else{
        res.status(400).json({"greska":"Nekretnina sa id-em " + req.params.id + " ne postoji"});
    }
    
});

app.listen(3000);