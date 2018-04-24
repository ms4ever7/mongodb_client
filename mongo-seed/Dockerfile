FROM mongo

COPY init.json /init.json
CMD mongoimport --port 27017 --host mongo --db mongodb_client --collection cars --type json --file /init.json --jsonArray