<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class rulesException extends Exception {};

class insert extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('crudModel');
    }

    public function tramite_post(){
        try {

            $model = [
                'idTramite' => $this->input->post('idTramite'),
                'idDependencia'  => $this->input->post('idDependencia'),
                'idKiosco'  => $this->input->post('idKiosco'),
                'cveEntidad'  => $this->input->post('cveEntidad'),
                'cveMunicipio'  => $this->input->post('cveMunicipio'),
                'cveLocalidad'  => $this->input->post('cveLocalidad')
            ];

            if (
                !$model['idTramite'] ||
                (
                    !$model['idKiosco'] && !$model['idDependencia']
                )
            ){
                throw new rulesException('Parámetros incorrectos');
            }

            // verificar que exista el id de trámite
            $this->db->where('id', $model['idTramite']);
            $this->db->from('catramites');
            if ($this->db->count_all_results() == 0)
                throw new rulesException("Trámite no encontrado [ {$model['idTramite']} ]");
            
            // verificar que exista el id de dependencia o kiosco
            $this->db->where('id', $model['idDependencia'] ? $model['idDependencia'] : $model['idKiosco']);
            $this->db->from( $model['idDependencia'] ? 'cadependencias' : 'cakioscos' );
            if ($this->db->count_all_results() == 0) 
                throw new rulesException( ($model['idDependencia'] ? 'Dependencia' : 'Kiosco') . " no encontrado [ " . (string)($model['idDependencia'] ? $model['idDependencia'] : $model['idKiosco']) . " ]");

            // verificar que existe la clave de entidad
            if ($model['cveEntidad']) {
                if ($model['cveEntidad'] < 1 && $model['cveEntidad'] > 33)                
                    throw new rulesException( "Entidad no encontrada [ {$model['cveEntidad']} ]");

                $this->load->add_package_path(FCPATH.'vendor/maltyxx/restclient')->library('restclient')->remove_package_path(FCPATH.'vendor/maltyxx/restclient');

                // verificar que existe la clave de municipio            
                if ($model['cveMunicipio']) {                
                    if (strlen($model['cveMunicipio']) !== 36) 
                        throw new rulesException( "Formato de clave del municipio incorrecto [ {$model['cveMunicipio']} ]");

                    $wsResponse = $this->restclient->get("http://proveedores.col.gob.mx/REST_Services/FrameWork/index.php/localizacion/serverlocalizacion/Municipio/format/json/{$model['cveMunicipio']}", array());
                    if (!is_array($wsResponse))
                        throw new rulesException( "Municipio no encontrado [ {$model['cveMunicipio']} ]");

                    // verificar que existe la clave de localidad
                    if ($model['cveLocalidad']) {
                        if (strlen($model['cveLocalidad']) !== 36) 
                            throw new rulesException( "Formato de clave de la localidad incorrecto [ {$model['cveLocalidad']} ]");
                        // Obtener lista de dependencias del servicio de tramites en línea 
                        $this->load->add_package_path(FCPATH.'vendor/maltyxx/restclient')->library('restclient')->remove_package_path(FCPATH.'vendor/maltyxx/restclient');
                        $wsResponse = $this->restclient->get("http://proveedores.col.gob.mx/REST_Services/FrameWork/index.php/localizacion/serverlocalizacion/Localidad/format/json/{$model['cveLocalidad']}", array());
                        if (!is_array($wsResponse))
                            throw new rulesException( "Localidad no encontrada [ {$model['cveLocalidad']} ]");
                    }
                }
            }
            
            $idTransaction = $this->crudModel->tramite_post($model);

            $this->response([
                'status' => true,
                'message' => 'Registro de trámite guardado con éxito',
                'idTransaction' => $idTransaction
            ], REST_Controller::HTTP_OK);

        } catch (rulesException $e){

            $this->response([
                'status' => false,
                'message' => $e->getMessage()
            ], REST_Controller::HTTP_BAD_REQUEST);
			
		} catch (Exception $e) {

            $this->response([
                'status' => false,                    
                'message' => $e->getMessage()
            ], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }    

}
