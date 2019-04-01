<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class query extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('catModel');
    }

    public function dependencias_get($id = null, $desc = null){
        if (!$id)
            $id = $this->input->get('id');

        if (!$desc)
            $desc = $this->input->get('desc');

        try {
            $this->response([
                'status' => true,
                'data' => $this->catModel->caDependencias($id, $desc)
            ], REST_Controller::HTTP_OK);

        } catch (Exception $e) {

            $this->response([
                'status' => false,                    
                'message' => $e->getMessage()
            ], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function kioscos_get($id = null, $desc = null){
        if (!$id)
            $id = $this->input->get('id');

        if (!$desc)
            $desc = $this->input->get('desc');

        try {
            $this->response([
                'status' => true,
                'data' => $this->catModel->caKioscos($id, $desc)
            ], REST_Controller::HTTP_OK);

        } catch (Exception $e) {

            $this->response([
                'status' => false,
                'message' => $e->getMessage()
            ], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function tramites_get($id = null, $desc = null){
        if (!$id)
            $id = $this->input->get('id');

        if (!$desc)
            $desc = $this->input->get('desc');

        try {
            $this->response([
                'status' => true,
                'data' => $this->catModel->caTramites($id, $desc)
            ], REST_Controller::HTTP_OK);

        } catch (Exception $e) {

            $this->response([
                'status' => false,
                'message' => $e->getMessage()
            ], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}
