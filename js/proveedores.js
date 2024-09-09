var proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
var seleccionado = null;

function  registrarProveedor(){
    var empresa = document.getElementById('empresa').value;
    var contacto = document.getElementById('contacto').value;
    var tel = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var direccion = document.getElementById('direccion').value;

    if(empresa == '' || contacto == '' || telefono == '' || correo == '' || direccion == ''){
        Swal.fire({
            title: "Faltan datos!",
            text: "Por favor llene todos los campos del formulario!!!!",
            icon: "warning"
        });
        return;
    }

    var proveedor = {
        empresa: empresa,
        contacto: contacto,
        telefono: tel,
        correo: correo,
        direccion: direccion
    }

    if(seleccionado != null){
        proveedores[seleccionado] = proveedor;
    } else {
        proveedores.push(proveedor);
    }

    localStorage.setItem('proveedores', JSON.stringify(proveedores));

    window.location.href = 'proveedores.html';
}

function cargarDatos(){

    var cadena = '';
    for(let i = 0; i < proveedores.length; i++){
        cadena += `<tr>
                        <td>${i+1}</td>
                        <td>${proveedores[i].empresa}</td>
                        <td>${proveedores[i].contacto}</td>
                        <td>${proveedores[i].telefono}</td>
                        <td>${proveedores[i].direccion}</td>
                        <td>${proveedores[i].correo}</td>
                        <td>
                            <div class="acciones">
                                <button onclick="editarProveedor(${i})" class="btn btn-edit m5">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button onclick="eliminarProveedor(${i})" class="btn btn-delete m5">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    `;
    }

    if(proveedores.length == 0){
        cadena += `<tr>
                        <td colspan="7" align="center">
                            <br>
                            <br>
                                No hay proveedores registrados!
                                <br>
                                <br>
                                <br>
                                <a href="proveedoresForm.html" class="btn btn-nuevo">
                                    <i class="fa fa-plus"></i>
                                    Nuevo
                                </a>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
                    </tr>
                    `;
    }

    document.getElementById('listaProveedores').innerHTML = cadena;
}

function eliminarProveedor(posicion){
    Swal.fire({
        title: "Esta seguro?",
        text: "El proveedor se eliminará!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminar!",
    }).then((result) => {
        if (result.isConfirmed) {          

            proveedores.splice(posicion, 1);

            localStorage.setItem('proveedores', JSON.stringify(proveedores));
            cargarDatos();

            Swal.fire({
                title: "Eliminado!",
                text: "El proveedor ha sido eliminado.",
                icon: "success",
            });
        }
    });
}

function editarProveedor(posicion){
    localStorage.setItem('proveedor_seleccionado', posicion);

    window.location.href = 'proveedoresForm.html';
}

function setearDatos(){
    seleccionado = localStorage.getItem('proveedor_seleccionado');
    if(seleccionado != null && seleccionado >= 0 && seleccionado != undefined){
        var elProve = proveedores[seleccionado];

        document.getElementById('empresa').value = elProve.empresa;
        document.getElementById('contacto').value = elProve.contacto;
        document.getElementById('telefono').value = elProve.telefono;
        document.getElementById('correo').value = elProve.correo;
        document.getElementById('direccion').value = elProve.direccion;
    }
}

function buscarProveedor(){
    var buscador = document.getElementById('buscar').value;

    var nuevoArray = [];
    
    if(buscador.trim() == '' || buscador.trim() == null){
        nuevoArray = JSON.parse(localStorage.getItem('proveedores')) || [];
    } else {
        
        for(let i = 0; i < proveedores.length; i++){
            var texto = proveedores[i].empresa.toLowerCase();
            if(texto.search(buscador.toLowerCase()) >= 0){
                nuevoArray.push(proveedores[i]);
            }
        }
    }

    proveedores = nuevoArray;
    cargarDatos();
}