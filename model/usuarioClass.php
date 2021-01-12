<?php
class usuarioClass{
    
    protected $id;
    protected $nombre;
    protected $apellidos;
    protected $username; 
    protected $password;
    protected $imagen;
    protected $admin;
    protected $adminTienda;

    function getId()
    {
        return $this->id;
    }

    function getNombre()
    {
        return $this->nombre;
    }

    function getApellidos()
    {
        return $this->apellidos;
    }

    function getUsername()
    {
        return $this->username;
    }

    function getPassword()
    {
        return $this->password;
    }

    function getAdmin()
    {
        return $this->admin;
    }

    function getAdminTienda()
    {
        return $this->adminTienda;
    }

    function setId($id)
    {
        $this->id = $id;
    }

    function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }

    function setUsername($username)
    {
        $this->username = $username;
    }

    function setPassword($password)
    {
        $this->password = $password;
    }

    function setAdmin($admin)
    {
        $this->admin = $admin;
    }

    function setAdminTienda($adminTienda)
    {
        $this->adminTienda = $adminTienda;
    }
    
    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    } 

}