<?php

class productoTiendaClass{
    
    protected $idProducto;
    protected $idTienda;
    protected $precio;
    protected $unidades;

    function getIdProducto()
    {
        return $this->idProducto;
    }

    function getIdTienda()
    {
        return $this->idTienda;
    }

    function getPrecio()
    {
        return $this->precio;
    }

    function getUnidades()
    {
        return $this->unidades;
    }

    function setIdProducto($idProducto)
    {
        $this->idProducto = $idProducto;
    }

    function setIdTienda($idTienda)
    {
        $this->idTienda = $idTienda;
    }

    function setPrecio($precio)
    {
        $this->precio = $precio;
    }

    function setUnidades($unidades)
    {
        $this->unidades = $unidades;
    }
    
    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    } 

}