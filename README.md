Welcome to simple mongodb client.

To start working with this app u need: 

 - install docker(if u don't have it on your OS), here is the link https://docs.docker.com/install/

 - after docker has successfully been installed go to app folder and run `docker-compose up --build` 

 - go to http://localhost:3000 and try the app

 - there is a car collection u can fetch data from and it's properties:
   * name(string)
   * founder(string)
   * country(string)
   * years(number)
   * series(string)
   * color(object with boolean properties: black, blue, red)

 - here is commands that are available to get data: 
   * select with projections and subprojections
     * and conditions like (order by, where, skip, limit)
