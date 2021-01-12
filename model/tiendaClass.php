<?php

class tiendaClass{
    
    protected $id;
    protected $nombre;
    protected $direccion;
    protected $tipo;
    protected $imagen;
    protected $telefono;
    protected $email;
    
    function getId()
    {
        return $this->id;
    }

    function getNombre()
    {
        return $this->nombre;
    }

    function getDireccion()
    {
        return $this->direccion;
    }

    function getTipo()
    {
        return $this->tipo;
    }

    function getImagen()
    {
        return $this->imagen;
    }

    function getTelefono()
    {
        return $this->telefono;
    }

    function getEmail()
    {
        return $this->email;
    }

    function setId($id)
    {
        $this->id = $id;
    }

    function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    function setDireccion($direccion)
    {
        $this->direccion = $direccion;
    }
    
    function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }

    function setImagen($imagen)
    {
        $this->imagen = $imagen;
    }

    function setTelefono($telefono)
    {
        $this->telefono = $telefono;
    }

    function setEmail($email)
    {
        $this->email = $email;
    }

    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    }
    
}