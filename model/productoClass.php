<?php

class productoClass{
    
    protected $id;
    protected $nombre;
    protected $tipo;
    protected $imagen;

    function getId()
    {
        return $this->id;
    }

    function getNombre()
    {
        return $this->nombre;
    }

    function getTipo()
    {
        return $this->tipo;
    }

    function getImagen()
    {
        return $this->imagen;
    }

    function setId($id)
    {
        $this->id = $id;
    }

    function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }

    function setImagen($imagen)
    {
        $this->imagen = $imagen;
    }
    
    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    } 

}