#!/bin/bash

echo "1. elasticsearch-reset-password start"
output=$(echo "y" | docker exec -i es-instance1 bin/elasticsearch-reset-password -s -u elastic)
echo -e "\n$output"

echo "2. elasticsearch-create-enrollment-token start"
docker exec -i es-instance1 bin/elasticsearch-create-enrollment-token -s kibana

echo "3. elasticsearch certs copy"
docker cp es-instance1:/usr/share/elasticsearch/config/certs/http_ca.crt .

echo "4. kibana-verification-code start"
docker exec -it kb-instance1 bin/kibana-verification-code

echo "5. ping elastic health"
export ES_PWD=$output
curl --cacert http_ca.crt -u elastic:"$ES_PWD" http://localhost:9200/_cat/health?h=status