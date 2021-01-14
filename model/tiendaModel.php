<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}
include_once 'tiendaClass.php';

class tiendaModel extends tiendaClass{
    
    private $link;
    
    public function OpenConnect()
    {
        $konDat=new connect_data();
        try
        {
            $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }
    public function CloseConnect()
    {
        try
        {
            $this->link->close();
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
    }
    
    /*Insertar Tienda*/
    public function insertarTienda(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi�n
        
        $nombre=$this->getNombre();
        $direccion=$this->getDireccion();
        $tipo=$this->getTipo();
        $telefono=$this->getTelefono();
        $email=$this->getEmail();
        $imagen=$this->getImagen();
        
        $sql="CALL spInsertarTienda('$nombre', '$direccion', '$tipo', $telefono, '$email', '$imagen')";
        
        if ($this->link->query($sql)){
            return "Tienda insertada correctamente";
        }else{
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();
    }
    
    /*Lista de todas las Tienda*/
    public function setTiendas(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi�n

        $sql="CALL spAllTiendas()";
        
        $result = $this->link->query($sql);
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            /*Datos de las tiendas*/
            $tienda=new tiendaModel();
            $tienda->setId($row["id"]);
            $tienda->setNombre($row["nombre"]);
            $tienda->setDireccion($row["direccion"]);
            $tienda->setTipo($row["tipo"]);
            $tienda->setImagen($row["imagen"]);
            $tienda->setTelefono($row["telefono"]);
            $tienda->setEmail($row["email"]);
      
            array_push($list, get_object_vars($tienda));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
    /*Buscar tienda por id*/
    public function findTiendaById(){
        
        $this->OpenConnect();
        
        $idTienda=$this->getId();
        
        $sql="CALL spFindTiendaById($idTienda)";
        
        $result = $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $this->setId($row['id']);
            $this->setNombre($row['nombre']);
            $this->setDireccion($row['direccion']);
            $this->setTipo($row['tipo']);
            $this->setImagen($row['imagen']);
            $this->setTelefono($row['telefono']);
            $this->setEmail($row['email']);
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    /*Update Tienda*/
    public function updateTienda(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi�n
        
        $nombre=$this->getNombre();
        $direccion=$this->getDireccion();
        $tipo=$this->getTipo();
        $telefono=$this->getTelefono();
        $email=$this->getEmail();
        $imagen=$this->getImagen();
        $id=$this->getId();
        
        $sql="CALL spUpdateTienda('$nombre', '$direccion', '$tipo', '$imagen', $telefono, '$email', $id)";
        
        if ($this->link->query($sql)){
            return "Tienda actualizada correctamente";
        }else{
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();
    }

    public function deleteTienda(){
        $this->OpenConnect();
        
        $id=$this->getId();
        
        $sql="call spDeleteTienda($id)";
        
        if ($this->link->query($sql)){
            return "Tienda eliminada correctamente";
        }else{
            return "Error al eliminar";
        }
        $this->CloseConnect();
    }
    
    function ObjVars(){
        return get_object_vars($this);
    }
    
}