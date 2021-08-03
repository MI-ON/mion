import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";


createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Kim";
    // user.lastName = "Nayoon";
    // user.age = 19;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));


/*createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mirim2",
    database: "test",
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log("성공");
    // here you can start to work with your entities
}).catch(error => console.log(error));*/