FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db reach-engine --collection Cars --type json --file /init.json --jsonArray