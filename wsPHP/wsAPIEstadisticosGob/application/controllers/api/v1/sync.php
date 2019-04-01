<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class sync extends REST_Controller {

    function __construct(){
        parent::__construct();
        $this->load->model('syncModel');
    }

    public function dependencias_get(){
        try {
            $this->syncModel->caDependencias();
            $this->response(['status' => true,'message' => 'Catálogo de Dependencias actualizado con éxito'], REST_Controller::HTTP_OK);
        } catch (Exception $e) {
            $this->response(['status' => false,'message' => 'Catálogo de Kioscos => ' .$e->getMessage()], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function kioscos_get(){
        try {
            $this->syncModel->caKioscos();
            $this->response(['status' => true,'message' => 'Catálogo de Kioscos actualizado con éxito'], REST_Controller::HTTP_OK);
        } catch (Exception $e) {
            $this->response(['status' => false,'message' => 'Catálogo de Kioscos => ' .$e->getMessage()], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function tramites_get(){
        try {
            $this->syncModel->caTramites();
            $this->response(['status' => true,'message' => 'Catálogo de Tramites actualizado con éxito'], REST_Controller::HTTP_OK);
        } catch (Exception $e) {
            $this->response(['status' => false,'message' => 'Catálogo de Tramites => ' .$e->getMessage()], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function all_get(){
        try {
            $this->syncModel->caDependencias();
            $this->syncModel->caKioscos();
            $this->syncModel->caTramites();
            $this->response(['status' => true,'message' => 'Catálogos de Dependencias, Kioscos y Tramites actualizado con éxito'], REST_Controller::HTTP_OK);
        } catch (\Throwable $th) {
            $this->response(['status' => false,'message' => 'Catálogo de Tramites => ' .$e->getMessage()], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
