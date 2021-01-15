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
        
        $username=$this->username;
        $password=$this->password;
        
        $mensaje="no error"; 

        $sql="call spFindUser('$username', '$password')";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {   
            
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->apellidos=$row['apellidos'];
            $this->username=$row['username'];
            $this->password=$row['password'];
            $this->admin=$row['admin'];
            $this->adminTienda=$row['adminTienda'];
 
            $mensaje="no error"; 
            
        }else{
            $mensaje="usuario/contrasena incorrecta"; 
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $mensaje;
    }

    
    function ObjVars(){
        return get_object_vars($this);
    }
    
}