<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}
include_once 'usuarioClass.php';

class usuarioModel extends usuarioClass{
    
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
    
    public function findUser() {
        
        $this->OpenConnect();
        
        $username=$this->getUsername();
        $password=$this->getPassword;
        
        $mensaje="no error"; 

        $sql="call spFindUser('$username', '$password')";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {   
            
            $this->setId($row['id']);
            $this->setNombre($row['nombre']);
            $this->setApellidos($row['apellidos']);
            $this->setUsername($row['username']);
            $this->setPassword($row['password']);
            $this->setAdmin($row['admin']);
            $this->setAdminTienda($row['adminTienda']);
 
            $mensaje="no error"; 
            
        }else{
            $mensaje="usuario/contrasena incorrecta"; 
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $mensaje;
    }

    public function findUsuarioById() {
        
        $this->OpenConnect();
        
        $id=$this->getId();

        $sql="call spFindUsuarioById($id)";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {   
            
            $this->setId($row['id']);
            $this->setNombre($row['nombre']);
            $this->setApellidos($row['apellidos']);
            $this->setUsername($row['username']);
            $this->setPassword($row['password']);
            $this->setAdmin($row['admin']);
            $this->setAdminTienda($row['adminTienda']);
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    /*Update Tienda*/
    public function updateUsuario(){
        
        $this->OpenConnect();
        
        $id=$this->getId();
        $nombre=$this->getNombre();
        $apellidos=$this->getApellidos();
        $username=$this->getUsername();
        $password=$this->getPassword();
        
        $sql="CALL spUpdateUsuario('$nombre', '$apellidos', '$username', '$password', $id)";
        
        if ($this->link->query($sql)){
            return "Usuario actualizado correctamente";
        }else{
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();
    }

    
    function ObjVars(){
        return get_object_vars($this);
    }
    
}