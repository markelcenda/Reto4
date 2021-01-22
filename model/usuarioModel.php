<?php
if ($_SERVER["SERVER_NAME"] == "grupo4.zerbitzaria.net") {
    include_once("connect_data_remote.php");
} else {
    include_once("connect_data.php");
}
include_once 'usuarioClass.php';

class usuarioModel extends usuarioClass
{

    private $link;

    public function OpenConnect()
    {
        $konDat = new connect_data();
        try {
            $this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }
    public function CloseConnect()
    {
        try {
            $this->link->close();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function findUser()
    {

        $this->OpenConnect();

        $username = $this->getUsername();
        $password = $this->getPassword();

        $mensaje = "no error";

        $sql = "call spFindUser('$username', '$password')";
        $result = $this->link->query($sql);

        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->setId($row['id']);
            $this->setNombre($row['nombre']);
            $this->setApellidos($row['apellidos']);
            $this->setUsername($row['username']);
            $this->setPassword($row['password']);
            $this->setAdmin($row['admin']);
            $this->setAdminTienda($row['adminTienda']);

            $mensaje = "no error";
        } else {
            $mensaje = "usuario/contrasena incorrecta";
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $mensaje;
    }

    public function findUsuarioById()
    {

        $this->OpenConnect();

        $id = $this->getId();

        $sql = "call spFindUsuarioById($id)";
        $result = $this->link->query($sql);

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

    /*Update usuario*/
    public function updateUsuario()
    {

        $this->OpenConnect();

        $id = $this->getId();
        $nombre = $this->getNombre();
        $apellidos = $this->getApellidos();
        $username = $this->getUsername();
        $password = $this->getPassword();

        $sql = "CALL spUpdateUsuario('$nombre', '$apellidos', '$username', '$password', $id)";

        if ($this->link->query($sql)) {
            return "Usuario actualizado correctamente";
        } else {
            return "Se ha producido un error";
        }

        $this->CloseConnect();
    }

    /*Compara el username y email del usuario que desea regsitrarse con los demas usuario de la base de datos*/
    public function comparacionUsuario(){

        $this->OpenConnect();

        $username = $this->getUsername();
        $email = $this->getEmail();

        $sql = "CALL spComparacionUsuario('$username', '$email')";

        $this->link->query($sql);

        if ($this->link->affected_rows >= 1) {

            return "El nombre de usuario o el email ya estan registrados";

        } else {

            return "Datos no encontrados";
        }

        $this->CloseConnect();
    }

    /*Insert usuario*/
    public function insertarUsuario(){

        $this->OpenConnect();

        $username = $this->getUsername();
        $nombre = $this->getNombre();
        $apellidos = $this->getApellidos();
        $email = $this->getEmail();
        $password = $this->getPassword();

        $sql = "CALL spInsertarUsuario('$username', '$nombre', '$apellidos', '$email', '$password')";

        if ($this->link->query($sql)) {

            return "Registro realizado con exito";

        } else {

            return "Se ha producido un error";
        }

        $this->CloseConnect();
    }

    /*Lista de todos los usuarios no administradores*/
    public function setUsuariosNoAdminTienda()
    {

        $this->OpenConnect();

        $sql = "CALL spUsuariosNoAdminTienda()";

        $result = $this->link->query($sql);
        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            /*Datos de los usuarios*/
            $usuario = new usuarioModel();
            $usuario->setId($row["id"]);
            $usuario->setNombre($row["nombre"]);
            $usuario->setApellidos($row["apellidos"]);
            $usuario->setUsername($row["username"]);
            $usuario->setPassword($row["password"]);
            $usuario->setAdmin($row["admin"]);
            $usuario->setAdminTienda($row["adminTienda"]);

            array_push($list, get_object_vars($usuario));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }

    /*Update usuario*/
    public function updateUsuarioAdminTienda()
    {

        $this->OpenConnect();

        $idUsuario = $this->getId();
        $idTienda = $this->getAdminTienda();

        $sql = "CALL spUpdateUsuarioAdminTienda($idTienda, $idUsuario)";

        if ($this->link->query($sql)) {
            return "Usuario convertido en AdminTienda";
        } else {
            return "Se ha producido un error";
        }

        $this->CloseConnect();
    }

    /*Lista de todos los usuarios AdminTienda*/
    public function setUsuariosAdminTienda()
    {

        $this->OpenConnect();

        $sql = "CALL spUsuariosAdminTienda()";

        $result = $this->link->query($sql);
        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            /*Datos de los usuarios*/
            $usuario = new usuarioModel();
            $usuario->setId($row["id"]);
            $usuario->setNombre($row["nombre"]);
            $usuario->setApellidos($row["apellidos"]);
            $usuario->setUsername($row["username"]);
            $usuario->setPassword($row["password"]);
            $usuario->setAdmin($row["admin"]);
            $usuario->setAdminTienda($row["adminTienda"]);

            array_push($list, get_object_vars($usuario));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }

    /*Update usuario, quitar adminTienda*/
    public function updateUsuarioNoAdminTienda()
    {

        $this->OpenConnect();

        $idUsuario = $this->getId();

        $sql = "CALL spUpdateUsuarioNoAdminTienda($idUsuario)";

        if ($this->link->query($sql)) {
            return "Usuario eliminado como administrador tienda";
        } else {
            return "Se ha producido un error";
        }

        $this->CloseConnect();
    }


    function ObjVars()
    {
        return get_object_vars($this);
    }
}
