<?php

include_once 'connect_data.php';
include_once 'productoClass.php';

class productoModel extends productoClass{
    
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
    
    /*Insertar producto*/
    public function insertarProducto(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $nombre=$this->nombre;
        $tipo=$this->tipo;
        $imagen=$this->imagen;
        
        $sql="CALL spInsertarProducto('$nombre', '$tipo', '$imagen')";
        
        if ($this->link->query($sql))
        {
            return "Producto insertado correctamente";
        } else {
            return "Error al modificar";
        }
        
        $this->CloseConnect();
    }
    
    /*conseguir la id del producto para hacer el insert en la tabla productosTiendas*/
    public function lastId(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $sql = "CALL spLastId()"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row       
            
            $this->id=$row['id'];
                               
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        
    }

    function ObjVars(){
        return get_object_vars($this);
    }
    
}