Welcome to simple mongodb client.

To start working with this app u need: 

 - Install docker(if u don't have it on your OS), here is the link https://docs.docker.com/install/

 - After docker has successfully been installed run docker app. After this, go to app folder and run:
   * `docker`
   * `docker -v`
   * `docker-compose up --build` 

 - Go to http://localhost:3000 and try the app (input is already with value for u to just click on the button)

 - There is a car collection u can fetch data from and it's properties:
   * name `string`
   * founder `string`
   * country `string`
   * years `number`
   * series `string`
   * color `object with boolean properties: black, blue, red`

 - Here is commands that are available to get data: 
   * select with projections and subprojections;
   * and conditions like (order by, where, skip, limit)


To connect to mongo db go to folder app and run commands:
 1) `docker-compose exec mongo bash`
 2) attach to db:  `mongo`
 3) use db: `use mongodb_client`
 
To run test on frontend go to `app folder/front_end/app` and run
 - npm test
 
To run test on backend go to `app folder/back_end` and run
 - npm test
