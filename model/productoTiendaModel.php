<?php

include_once 'connect_data.php';
include_once 'productoTiendaClass.php';
include_once 'tiendaModel.php';

class productoTiendaModel extends productoTiendaClass{
    
    private $link;
    private $objTienda;
    
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
        
        $this->OpenConnect();
        
        $idProducto=$this->getIdProducto();
        $idTienda=$this->getIdTienda();
        $precio=$this->getPrecio();
        $unidades=$this->getUnidades();
        
        $sql="CALL spInsertarProductoTienda($idProducto, $idTienda, $precio, $unidades)";

        $this->link->query($sql);
        
        if ($this->link->query($sql)){
            return "Producto insertado correctamente";
        }else{
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();
    }
    
    public function findProductoTiendaById(){
        
        $this->OpenConnect();
        
        $idProducto=$this->getIdProducto();
        
        $sql="CALL spFindProductoTiendaById($idProducto)";
        
        $result = $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
          
            $this->setIdProducto($row['idProducto']);
            $this->setIdTienda($row['idTienda']);
            $this->setPrecio($row['precio']);
            $this->setUnidades($row['unidades']);
            
            /*objTienda*/
            $tienda=new tiendaModel();
            $tienda->setId($row['idTienda']);
            $tienda->findTiendaById();
            
            $this->objTienda=$tienda->ObjVars();
        
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    /*Update productoTienda*/
    public function updateProductoTienda(){
        
        $this->OpenConnect();
        
        $idProducto=$this->getIdProducto();
        $idTienda=$this->getIdTienda();
        $precio=$this->getPrecio();
        $unidades=$this->getUnidades();
        
        $sql="CALL spUpdateProductoTienda($idTienda, $precio, $unidades, $idProducto)";
        
        if ($this->link->query($sql)){
            return "Producto actualizada correctamente";
        }else{
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();
    }
    
    function ObjVars(){
        return get_object_vars($this);
    }
    
}