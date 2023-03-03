#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
DIR=".bak"
FILE="${DIR}/${DT}.tgz"
FILE_EXCLUDE="exclude.tag"
mkdir $DIR -p
touch .bak/${FILE_EXCLUDE}
touch dist/${FILE_EXCLUDE}
touch node_modules/${FILE_EXCLUDE}
touch src-tauri/target/${FILE_EXCLUDE}
touch server/node_modules/${FILE_EXCLUDE}

tar -zcvf ${FILE} \
	--exclude-tag-all=${FILE_EXCLUDE} \
	.