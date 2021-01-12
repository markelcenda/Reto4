<?php

class ventaClass{
    
    protected $id;
    protected $idProducto;
    protected $idUsuario;
    protected $fecha;
    protected $precio;
    protected $unidades;
    protected $idTienda;
    
    function getId()
    {
        return $this->id;
    }

    function getIdProducto()
    {
        return $this->idProducto;
    }

    function getIdUsuario()
    {
        return $this->idUsuario;
    }

    function getFecha()
    {
        return $this->fecha;
    }

    function getPrecio()
    {
        return $this->precio;
    }

    function getUnidades()
    {
        return $this->unidades;
    }

    function getIdTienda()
    {
        return $this->idTienda;
    }

    function setId($id)
    {
        $this->id = $id;
    }

    function setIdProducto($idProducto)
    {
        $this->idProducto = $idProducto;
    }

    function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    function setFecha($fecha)
    {
        $this->fecha = $fecha;
    }

    function setPrecio($precio)
    {
        $this->precio = $precio;
    }

    function setUnidades($unidades)
    {
        $this->unidades = $unidades;
    }

    function setIdTienda($idTienda)
    {
        $this->idTienda = $idTienda;
    }

    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    }
    
}