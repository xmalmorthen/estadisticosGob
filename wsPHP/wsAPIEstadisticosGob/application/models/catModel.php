<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class catModel extends CI_Model {
        public function __construct(){
                parent::__construct();
        }

        public function caDependencias($id = null, $desc = null){
                $returnResponse = NULL;
                try {
                        $this->db->cache_on();
                        $this->db->select('*');
                        $this->db->from('cadependencias');

                        if ($id)
                                $this->db->where('id', $id);
                        else if ($desc)
                                $this->db->where('MATCH (nombre) AGAINST ("{$desc}")', NULL, FALSE);

                        $query = $this->db->get();
                        $this->db->cache_off();

                        if (!$query){
                                throw new Exception($this->db->error()['message']);
                        }

                        $data = $query->result();

                        $returnResponse = $query->result();
                }
                catch (Exception $e) {
                        log_message('error',$e->getMessage() . " [ GUID = {$this->config->item('GUID')} ]");
                        throw $e;
                }

                return $returnResponse;
        }

        public function caKioscos($id = null, $desc = null){
                $returnResponse = NULL;
                try {
                        $this->db->cache_on();
                        $this->db->select('*');
                        $this->db->from('caKioscos');

                        if ($id)
                                $this->db->where('id', $id);
                        else if ($desc)
                                $this->db->where('MATCH (nombre) AGAINST ("{$desc}")', NULL, FALSE);

                        $query = $this->db->get();
                        $this->db->cache_off();

                        if (!$query){
                                throw new Exception($this->db->error()['message']);
                        }

                        $returnResponse = $query->result();
                }
                catch (Exception $e) {
                        log_message('error',$e->getMessage() . " [ GUID = {$this->config->item('GUID')} ]");
                        throw $e;
                }

                return $returnResponse;
        }

        public function caTramites($id = null, $desc = null){
                $returnResponse = NULL;
                try {
                        $this->db->cache_on();
                        $this->db->select('*');
                        $this->db->from('caTramites');

                        if ($id)
                                $this->db->where('id', $id);
                        else if ($desc)
                                $this->db->where("MATCH (nombre) AGAINST ('" . $desc . "')", NULL, FALSE);

                        $query = $this->db->get();
                        $this->db->cache_off();

                        if (!$query){
                                throw new Exception($this->db->error()['message']);
                        }

                        $returnResponse = $query->result();
                }
                catch (Exception $e) {
                        log_message('error',$e->getMessage() . " [ GUID = {$this->config->item('GUID')} ]");
                        throw $e;
                }

                return $returnResponse;
        }        

}