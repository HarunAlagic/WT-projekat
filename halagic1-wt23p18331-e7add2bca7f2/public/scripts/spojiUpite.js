function posaljiUpit(){
    let upit = document.getElementById("upit").value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    PoziviAjax.postUpit(id, upit, (err, response) => {
        if(err){
            console.log(err);
        }else{
            console.log(response);
        }
    });
    location.reload();
}