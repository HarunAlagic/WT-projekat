function prijava(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    PoziviAjax.postLogin(username, password, (err, response) => {
        if(err){
            console.log(err);
        }else{
            console.log(response);
            location.href = "http://localhost:3000/nekretnine.html";
        }
    });
    
}