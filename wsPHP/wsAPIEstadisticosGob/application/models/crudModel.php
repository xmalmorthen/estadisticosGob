<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class crudModel extends CI_Model {
        public function __construct(){
                parent::__construct();
        }

        public function tramite_post($model){
                try {
                        
                        $data = array(
                                'idTramite' => $model['idTramite'],
                                'idKiosco' => $model['idKiosco'],
                                'idDependencia' => $model['idDependencia'],
                                'cveEntidad' => $model['cveEntidad'],
                                'cveMunicipios' => $model['cveMunicipio'],
                                'cveLocalidades' => $model['cveLocalidad']
                        );

                        $this->db->insert('maRegistroTramites', $data);
                        $idTransaction = $this->db->insert_id();

                        $error = $this->db->error();
                        if ($error['code'] != 0){
                                throw new Exception($error['message']);                                
                        } 

                        return $idTransaction;
                }
                catch (Exception $e) {
                        log_message('error',$e->getMessage() . " [ GUID = {$this->config->item('GUID')} ]");
                        throw $e;
                }
        }

        
}