<?php defined('BASEPATH') OR defined('INICONFIGFILE') OR  exit('No direct script access allowed');

/*
 * Autor: Miguel Angel Rueda Aguilar
 * Fecha: 29-08-2018
 * Descripción: Clase para generar estructura a partir del archivo de configuraciones
 */
class Ini_cnfg {
    private static $file = NULL;
    public static $ini = NULL;
    
/*
 * Autor: Miguel Angel Rueda Aguilar
 * Fecha: 29-08-2018
 * Descripción: Constructor de clase
 * Parámetros:
 *        Entrada: $inifile - nombre de archivo ini
 *        Salida :
 */
    private static function construct($inifile = NULL) {
        if (!$inifile) {
            if (defined('INICONFIGFILE')) {
                $inifile = INICONFIGFILE;
            } else {
                show_error('No se especificó el archivo de configuración',500);
            }
        }        
        self::_exist($inifile);
        self::$file = $inifile;        
    }
    
/*
* Autor: Miguel Angel Rueda Aguilar
* Fecha: 29-08-2018
* Descripción: Convertidor de formato ini a  clase php
* Parámetros:
*	Entrada: 
*               $inifile : ruta y nombre de archivo a leer
*	Salida: 
*               Clase en php de la estructura de archivo de configuración
*/
    public static function parse($inifile = NULL){
        self::construct($inifile);
        self::_exist();
        $parse_ini = parse_ini_file(self::$file,true);
        self::$ini = new stdClass();
        foreach ($parse_ini as $key => $value) {
            self::$ini->$key = $value;
        };        
        return self::$ini;
    }

/*
 * Autor: Miguel Angel Rueda
 * Descripción: verifica que exista el archivo de configuraciones ini
 * Parámetros:
 *        Entrada: 
 *                  $inifile : ruta y nombre de archivo a leer
 *                  $showerror - indica si se genera un error de salida o no
 *        Salida: TRUE o FALSE
 */     
    private static function _exist($inifile = NULL, $showerror = TRUE){
        $returnResponse = false;
        $file = $inifile !== NULL ? $inifile : self::$file;        

        if (!file_exists($file)) {
            if ($showerror) {
                require 'application/libraries/Msg_reporting.php';
                Msg_reporting::system_error("El archivo de configuración [ <strong>{$file}</strong> ], no se encuentra o no se tiene el permiso de lectura, favor de revisar...!!!");
            }
            return false;
        }
        $returnResponse = true;

        return $returnResponse;
    }
    
}
