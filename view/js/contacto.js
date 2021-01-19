function enviarComentario(){

    var url="../../controller/cComentario.php";

	fetch(url, {
	  method: 'GET'
	})
	.then(res => res.json()).then(result => {

        console.log(result);

	})
	.catch(error => console.error('Error status:', error));	
    
}