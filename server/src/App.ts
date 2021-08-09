import express from "express";
import bodyParser from "body-parser";
import { Connection } from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import { User } from "./entity/User";

class App {
  public application: express.Application;

  constructor(server: GraphQLServer, connection: Connection) {
    this.application = server.express;
    this.modules();
    this.router();
  }

  private modules(): void {
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: true }));
  }

  private router(): void {
    this.application.post(
      "/api/user/login",
      (req: express.Request, res: express.Response) => {
        User.findOne({ email: req.body.userEmail }).then((user) => {
          if (user) {
            // TODO: get user image and transform image url
            const imageUrl = user.image_url ?? null;
            res.json({ imageUrl: imageUrl });
          } else {
            const newUser = new User();
            newUser.email = req.body.userEmail;
            newUser.full_name = req.body.userName;
            newUser.image_url = null;
            newUser.save();
          }
        });
      }
    );
  }
}

export default App;
