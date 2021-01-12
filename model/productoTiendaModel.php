<?php

include_once 'connect_data.php';
include_once 'productoTiendaClass.php';

class productoTiendaModel extends productoTiendaClass{
    
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
    public function insertarProductoTienda(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $idProducto=$this->idProducto;
        $idTienda=$this->idTienda;
        $precio=$this->precio;
        $unidades=$this->unidades;
        
        $sql="CALL spInsertarProductoTienda($idProducto, $idTienda, $precio, $unidades)";
        
        if ($this->link->query($sql))
        {
            return "Producto insertado correctamente";
        } else {
            return "Error al modificar";
        }
        
        $this->CloseConnect();
    }
    
    function ObjVars(){
        return get_object_vars($this);
    }
    
}