import App from "./App";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";


createConnection().then(async connection => {

  const app = new App().application;

  
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });


  //save
  // const user = new User();
  // user.user_email = "Mia@gmail.com";
  // user.nickname = "Mia";
  // user.image = null;
  // await connection.manager.save(user);

  console.log("connect 🚀");


}).catch(error => console.log(error));




