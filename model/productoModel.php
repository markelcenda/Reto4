<?php

include_once 'connect_data.php';
include_once 'productoClass.php';
include_once 'productoTiendaModel.php';

class productoModel extends productoClass{
    
    private $link;
    private $objProductoTienda;

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
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi�n
        
        $nombre=$this->getNombre();
        $tipo=$this->getTipo();
        $imagen=$this->getImagen();
        
        $sql="CALL spInsertarProducto('$nombre', '$tipo', '$imagen')";
        
        if ($this->link->query($sql)){
            return "Producto insertado correctamente";
        }else{
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();
    }
    
    /*conseguir la id del producto para hacer el insert en la tabla productosTiendas*/
    public function lastId(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi�n
        
        $sql = "CALL spLastId()"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row       
            
            $this->id=$row['id'];
                               
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        
    }
    
    /*Lista de todos los productos*/
    public function setProductos(){
        
        $this->OpenConnect(); 
        
        $sql="CALL spAllProductos()";
        
        $result = $this->link->query($sql);
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            /*Datos de los productos*/
            $producto=new productoModel();
            $producto->setId($row["id"]);
            $producto->setNombre($row["nombre"]);
            $producto->setTipo($row["tipo"]);
            $producto->setImagen($row["imagen"]);
            
            /*objProductoTienda*/
            $productoTienda=new productoTiendaModel();
            $productoTienda->setIdProducto($row['id']);
            $productoTienda->findProductoTiendaById();
            
            $producto->objProductoTienda=$productoTienda->ObjVars();

            
            array_push($list, get_object_vars($producto));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
    /*buscar producto por id*/
    public function findProductoById(){
        
        $this->OpenConnect();
        $id=$this->getId();
        
        $sql="CALL spFindProductoById($id)";
        
        $result = $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            /*Datos de los productos*/
            $this->setId($row["id"]);
            $this->setNombre($row["nombre"]);
            $this->setTipo($row["tipo"]);
            $this->setImagen($row["imagen"]);
            
            /*objProductoTienda*/
            $productoTienda=new productoTiendaModel();
            $productoTienda->setIdProducto($row['id']);
            $productoTienda->findProductoTiendaById();
            
            $this->objProductoTienda=$productoTienda->ObjVars();
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    /*Update producto*/
    public function updateProducto(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi�n
        
        $id=$this->getId();
        $nombre=$this->getNombre();
        $tipo=$this->getTipo();
        $imagen=$this->getImagen();
        
        
        $sql="CALL spUpdateProducto('$nombre', '$tipo', '$imagen', $id)";
        
        if ($this->link->query($sql)){
            return "Producto actualizado correctamente";
        }else{
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();
    }

    public function deleteProducto(){
        $this->OpenConnect();
        
        $id=$this->getId();
        
        $sql="call spDeleteProducto($id)";
        
        if ($this->link->query($sql)){
            return "Producto eliminado correctamente";
        }else{
            return "Error al eliminar";
        }
        $this->CloseConnect();
    }

    function ObjVars(){
        return get_object_vars($this);
    }
    
}