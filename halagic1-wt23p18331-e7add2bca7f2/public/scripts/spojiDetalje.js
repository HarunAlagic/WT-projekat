function redirectNaDetalje(nekretnina_id){

    PoziviAjax.getNekretninaById(nekretnina_id, (err, response) => {
        if(err){
            console.log(err);
        }else{
            console.log(response);
        }
    });
}
