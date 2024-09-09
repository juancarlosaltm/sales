function login(){
    var usuario = document.getElementById('usuario').value;
    var contrasena = document.getElementById('contrasena').value;

    if(usuario == 'admin' && contrasena == 'admin.1'){
        localStorage.setItem('sesion', 'si');
        Swal.fire({
            title: "Bienvenido!",
            text: "Has iniciado sesion!!!!",
            icon: "success"
        }).then(() => {
            window.location.href = "index.html";
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Las credenciales no son validas!!!!",
            icon: "error"
        }).then(() => {
            localStorage.removeItem('sesion');
            window.location.href = "login.html";
        });
        return;
    }
}

function verificar(){
    if(localStorage.getItem('sesion') != 'si'){
        window.location.href = "login.html";
    }
}

function logout(){
    Swal.fire({
        title: "Esta seguro?",
        text: "Saldra de la sesion!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero salir!",
    }).then((result) => {
        if (result.isConfirmed) { 
            localStorage.removeItem('sesion');
            window.location.href = "login.html";
        }
    });
}

   