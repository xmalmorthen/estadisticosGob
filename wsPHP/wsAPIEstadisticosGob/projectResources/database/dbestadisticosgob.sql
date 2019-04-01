/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : dbestadisticosgob

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-04-01 16:25:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cadependencias
-- ----------------------------
DROP TABLE IF EXISTS `cadependencias`;
CREATE TABLE `cadependencias` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `fIns` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fAct` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `idRefService` varchar(15) NOT NULL COMMENT 'Id original proveniente del servicio\r\n\r\nhttp://www.tramitesyservicios.col.gob.mx/retys_rest/index.php/retys/getDependencias/format/xml\r\n\r\n"Id_Ads"',
  PRIMARY KEY (`id`),
  KEY `idx_id` (`id`),
  KEY `idx_idRefService` (`idRefService`),
  KEY `idx_nombre` (`nombre`),
  FULLTEXT KEY `idx_ft_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for cakioscos
-- ----------------------------
DROP TABLE IF EXISTS `cakioscos`;
CREATE TABLE `cakioscos` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `fIns` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fAct` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Id original proveniente del servicio\r\n\r\nhttps://www.secfin.col.gob.mx/wsKioscos/index.php/apiV1/obtener/kioscos.json\r\n\r\nid_kiosco\r\n\r\n',
  `idRefService` int(11) NOT NULL COMMENT 'Id original proveniente del servicio\r\n\r\nhttps://www.secfin.col.gob.mx/wsKioscos/index.php/apiV1/obtener/kioscos.json',
  PRIMARY KEY (`id`),
  KEY `idx_id` (`id`),
  KEY `idx_nombre` (`nombre`),
  KEY `idx_idRefService` (`idRefService`) USING HASH,
  FULLTEXT KEY `idx_ft_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for catramites
-- ----------------------------
DROP TABLE IF EXISTS `catramites`;
CREATE TABLE `catramites` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `tipoTramite` tinyint(4) NOT NULL COMMENT '1 = línea\r\n2 = tramite o servicio',
  `fIns` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fAct` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `idRefService` int(11) NOT NULL COMMENT 'Id original proveniente del servicio\r\n\r\nhttp://www.openapis.col.gob.mx/serviciosenlinea/index.php/rest/getTramite/9/format/json\r\n\r\nhttp://www.tramitesyservicios.col.gob.mx/retys_rest/index.php/retys/getTramite/format/xml?idTramite=1422\r\n\r\n',
  PRIMARY KEY (`id`),
  KEY `idx_id` (`id`) USING BTREE,
  KEY `idx_nombre` (`nombre`) USING BTREE,
  KEY `idx_idRefService` (`idRefService`) USING BTREE,
  FULLTEXT KEY `idx_ft_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for maregistrotramites
-- ----------------------------
DROP TABLE IF EXISTS `maregistrotramites`;
CREATE TABLE `maregistrotramites` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `idTramite` int(10) unsigned zerofill NOT NULL,
  `idKiosco` int(10) unsigned zerofill DEFAULT NULL,
  `idDependencia` int(10) unsigned zerofill DEFAULT NULL,
  `cveEntidad` varchar(40) DEFAULT NULL,
  `cveMunicipios` varchar(40) DEFAULT NULL,
  `cveLocalidades` varchar(40) DEFAULT NULL,
  `fIns` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_Tramite` (`idTramite`),
  KEY `fk_kioscos` (`idKiosco`),
  KEY `fk_dependencia` (`idDependencia`),
  CONSTRAINT `fk_Tramite` FOREIGN KEY (`idTramite`) REFERENCES `catramites` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dependencia` FOREIGN KEY (`idDependencia`) REFERENCES `cadependencias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_kioscos` FOREIGN KEY (`idKiosco`) REFERENCES `cakioscos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
