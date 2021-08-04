import App from "./App";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";


createConnection().then(async connection => {

  const app = new App().application;

  
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });

 
  // const user = new User();
  // user.firstName = "Kim";
  // user.lastName = "Nayoon";
  // user.age = 19;
  // await connection.manager.save(user);
  // console.log("Saved a new user with id: " + user.id);

  console.log("connect 🚀");


}).catch(error => console.log(error));




