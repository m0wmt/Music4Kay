#!/usr/bin/bash

#current date
DATE=`date +%y_%m_%d`
TIMESTAMP=$(date +"%Y%m%d_%H%M")

DATABASE_TIMESTAMP=$(date +"%Y-%m-%d %H:%M:00")

MARIADB_HOST="127.0.0.1"
MARIADB_PORT="3306"
MARIADB_DATABASE="sheetmusic"
MARIADB_USER="sheetmusicuser"
MARIADB_PASSWORD="kdjuM2opw"

BACKUP_DIR="/home/pi/music4kay/backup/"
BACKUP_DIR="/home/mark/dev/Music4Kay/backup/"

backup_mariadb(){
    mariadb-dump -h ${MARIADB_HOST} \
    -P ${MARIADB_PORT} \
    -u ${MARIADB_USER} \
    -p${MARIADB_PASSWORD} ${MARIADB_DATABASE} > ${BACKUP_DIR}${MARIADB_DATABASE}_${TIMESTAMP}.sql
}

update_database(){
    mariadb -h ${MARIADB_HOST} \
    -P ${MARIADB_PORT} \
    -u ${MARIADB_USER} \
    -p${MARIADB_PASSWORD} ${MARIADB_DATABASE} -e "UPDATE backup SET last_backup = '${DATABASE_TIMESTAMP}'"
}

#Restore example
#mariadb --user sheetmusicuser --password sheetmusic < sheetmusic_20260316.sql 

backup_mariadb

update_database