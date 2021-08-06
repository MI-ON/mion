import express from "express";
import bodyParser from "body-parser";
import { User } from "./entity/User";

class App {
  public application: express.Application;

  constructor() {
    this.application = express();
    this.modules();
    this.router();
  }

  private modules(): void {
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: true }));
  }

  private router(): void {
    this.application.post(
      "/api/login",
      (req: express.Request, res: express.Response) => {
        User.findOne({ user_email: req.body.userEmail }).then((user) => {
          if (!user) {
            const newUser = new User();
            newUser.user_email = req.body.userEmail;
            newUser.nickname = "";
            newUser.image = null;
            newUser.save();
          }
          res.json({
            loginSuccess: true,
          });
        });
      }
    );
  }
}

export default App;
