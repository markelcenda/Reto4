<?php

include_once 'connect_data.php';
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
        
        $nombre=$this->nombre;
        $direccion=$this->direccion;
        $tipo=$this->tipo;
        $telefono=$this->telefono;
        $email=$this->email;
        $imagen=$this->imagen;
        
        $sql="CALL spInsertarTienda('$nombre', '$direccion', '$tipo', '$telefono', '$email', '$imagen')";
        
        if ($this->link->query($sql))
        {
            return "Tienda insertada correctamente";
        } else {
            return "Error al modificar";
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
      
            array_push($list, $tienda->getObjectVars());
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
    
    
    function ObjVars(){
        return get_object_vars($this);
    }
    
}