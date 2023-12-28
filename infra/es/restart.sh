#!/usr/bin

export STACK_VERSION=8.11.1
export ES_PORT=9200
export KIBANA_PORT=5601
export ES_USERNAME=kibana_admin
export KIBANA_PASSWORD=qq970508

docker-compose down
docker volume rm infra_es_data
docker volume rm infra_kb_data

docker-compose up -d

echo "wait for instance startup"
until docker exec -it es-instance1 curl -sS "http://localhost:9200/_cat/health?h=status" | grep -q "green\|yellow"; do
  sleep 1
  echo -n "."
done
echo ""
docker exec -it es-instance1 bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v8.11.1/elasticsearch-analysis-ik-8.11.1.zip
docker restart es-instance1