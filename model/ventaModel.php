<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}

include_once 'ventaClass.php';
include_once 'productoModel.php';

class ventaModel extends ventaClass{
    
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

    /*Lista de todas las Tienda*/
    public function findVentaByIdUsuario(){
        
        $this->OpenConnect();
        $idUsuario=$this->getIdUsuario();

        $sql="CALL spFindVentasByIdUsuario($idUsuario)";
        
        $result = $this->link->query($sql);
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { 
            
            /*Datos de las tiendas*/
            $venta=new ventaModel();
            $venta->setId($row["id"]);
            $venta->setIdProducto($row["idProducto"]);
            $venta->setIdUsuario($row["idUsuario"]);
            $venta->setFecha($row["fecha"]);
            $venta->setPrecio($row["precio"]);
            $venta->setUnidades($row["unidades"]);
            $venta->setIdTienda($row["idTienda"]);

            $producto=new productoModel();
            $producto->setId($row["idProducto"]);
            $producto->findProductoById();

            $venta->objProducto=$producto->ObjVars();
      
            array_push($list, get_object_vars($venta));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
    function ObjVars(){
        return get_object_vars($this);
    }
    
}