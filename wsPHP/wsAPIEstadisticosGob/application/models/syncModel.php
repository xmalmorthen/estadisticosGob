<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class syncModel extends CI_Model {
        public function __construct(){
                parent::__construct();

                $this->load->add_package_path(FCPATH.'vendor/maltyxx/restclient')->library('restclient')->remove_package_path(FCPATH.'vendor/maltyxx/restclient');
        }

        public function caDependencias(){
                try {
                        $json = $this->restclient->get('http://www.tramitesyservicios.col.gob.mx/retys_rest/index.php/retys/getDependencias/format/xml', array());
                        $wsResponse = json_decode ($json);

                        foreach ($wsResponse as $key => $value) {
                                $this->db->like('idRefService', $value->Id_Ads);
                                $this->db->from('cadependencias');
                                if ($this->db->count_all_results() == 0){
                                        $data = array(
                                                'nombre' => $value->Descrip,
                                                'idRefService' => $value->Id_Ads
                                        );

                                        $this->db->insert('cadependencias', $data);
                                }
                        }
                }
                catch (Exception $e) {
                        log_message('error',$e->getMessage() . " [ GUID = {$this->config->item('GUID')} ]");
                        throw $e;
                }
        }

        public function caKioscos(){
                try {
                        $wsResponse = $this->restclient->get('https://www.secfin.col.gob.mx/wsKioscos/index.php/apiV1/obtener/kioscos.json', array());

                        if(count($wsResponse['response']) > 0){
                                foreach ($wsResponse['response'] as $key => $value) {
                                        $this->db->like('idRefService', $value['id_kiosco']);
                                        $this->db->from('cakioscos');
                                        if ($this->db->count_all_results() == 0){
                                                $data = array(
                                                        'nombre' => $value['nombre'],
                                                        'idRefService' => $value['id_kiosco']
                                                );

                                                $this->db->insert('cakioscos', $data);
                                        }
                                }
                        }
                }
                catch (Exception $e) {
                        log_message('error',$e->getMessage() . " [ GUID = {$this->config->item('GUID')} ]");
                        throw $e;
                }
        }

        public function caTramites(){
                try {
                        /* TRAMITES EN LÍNEA */
                        // Obtener lista de dependencias del servicio de tramites en línea 
                        $wsResponse = $this->restclient->get('http://www.openapis.col.gob.mx/serviciosenlinea/index.php/rest/getDependencias/format/json', array());

                        if(count($wsResponse) > 0){

                                foreach ($wsResponse as $key => $value) {
                                        // Obtener lista de trámites por dependencia
                                        $wsResponseTramitesDependencia = $this->restclient->get("http://www.openapis.col.gob.mx/serviciosenlinea/index.php/rest/getTramitesDependencia/{$value['id_dependencia']}/format/json", array());
                                        if (count($wsResponseTramitesDependencia)){
                                                foreach ($wsResponseTramitesDependencia as $key => $valueTramite) {

                                                        $this->db->like('idRefService', $valueTramite['id']);
                                                        $this->db->from('catramites');
                                                        if ($this->db->count_all_results() == 0){
                                                                $data = array(
                                                                        'nombre' => $valueTramite['nombre'],
                                                                        'idRefService' => $valueTramite['id'],
                                                                        'tipoTramite' => 1 //TRAMITE EN LÍNEA
                                                                );

                                                                $this->db->insert('catramites', $data);
                                                        }

                                                }
                                        }
                                        
                                }

                        } else {
                                throw new Exception("No fue posible obtener lista de dependencias para trámites en línea");
                        }                        
                        /* /TRAMITES EN LÍNEA */

                        /* TRAMITES y SERVICIOS */
                        // Obtener lista de dependencias del servicio de tramites en línea 
                        $json = $this->restclient->get('http://www.tramitesyservicios.col.gob.mx/retys_rest/index.php/retys/getTramitesABC', array());
                        $wsResponse = json_decode ($json);

                        if(count($wsResponse) > 0){

                                foreach ($wsResponse as $key => $value) {
                                        
                                        $this->db->like('idRefService', $value->id_tramite);
                                        $this->db->from('catramites');
                                        if ($this->db->count_all_results() == 0){
                                                $data = array(
                                                        'nombre' => $value->nombre,
                                                        'idRefService' => $value->id_tramite,
                                                        'tipoTramite' => 2 //TRAMITE EN LÍNEA
                                                );

                                                $this->db->insert('catramites', $data);
                                        }

                                }

                        } else {
                                throw new Exception("No fue posible obtener lista de dependencias para trámites en línea");
                        }



                }
                catch (Exception $e) {
                        log_message('error',$e->getMessage() . " [ GUID = {$this->config->item('GUID')} ]");
                        throw $e;
                }
        }

}