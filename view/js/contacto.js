//Envia el comentario escrito en el formulario de contacto a un correo electronico
function enviarComentario(){

    var asunto=$("#asunto").val();
    var mensaje=$("#mensaje").val();

    if( asunto=="" || mensaje==""){
        alert("Por favor rellena todo el formulario.")
    }else{

        var url="../../controller/cComentario.php";
        var data={"asunto":asunto, "mensaje": mensaje};

        fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'} 
        })
        .then(res => res.json()).then(result => {

            alert("Email enviado.")
        })
        .catch(error => console.error('Error status:', error));	

    }

    
    
}