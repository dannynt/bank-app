import express = require("express");//most important thing in here!
import "reflect-metadata";
import cookieParser = require("cookie-parser");//cookie-bookie
import { createConnection, getConnection, getRepository } from "typeorm";//handles the calls to the db
import { TypeormStore } from "connect-typeorm";
import * as bodyParser from "body-parser";
import helmet = require("helmet");
import cors = require("cors");
var session = require('express-session');//second most important thing!
import { Session } from "./ts/entity/Session";//entity for Session tables in the db
import * as cmds from "./ts/Commands";//needed Command classes from here.
import { checkSes } from "./ts/middlewares/checkSes";//middleware for checking if session is valid
import { TransactionCommand } from "./ts/TransactionCommand";
import { ViewTransactionsCommand } from "./ts/ViewTransactionsCommand";

async function createInitialUser() {
    const userRepository = getRepository(cmds.BankUser);
    const existingAdmin = await userRepository.findOne({ where: { role: "admin" } })
    if (!existingAdmin) {
        let initialUser = new cmds.BankUser();
        initialUser.username = "admin"
        initialUser.password = "admin"
        initialUser.first_name = "Ad"
        initialUser.last_name = "Min"
        initialUser.role = "admin"
        initialUser.hashPassword()
        userRepository.save(initialUser)
        console.log('created admin user')
    } else {
        console.log('there is already admin user')
    }
}

//Connects to the Database -> then starts the express
createConnection()
    .then(async connection => {
        // Create a new express application instance
        const app = express();
        const sessionRepository = getConnection().getRepository(Session);//connects to the session database.
        // Call middlewares
        app.use((req, res, next) => {
            // hacky way to make browser access http headers and put session stuff into cookies automagically, when using credentials: true on client-side request
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.header(
                "Access-Control-Allow-Headers",
                "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Origin, Access-Control-Allow-Origin"
            );
            if ("OPTIONS" == req.method) {
                res.send(200);
            } else {
                next();
            }
        });
        // app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());
        app.use(cookieParser());

        //Creating of the session
        app.use(session({
            name: "sid",
            secret: 'adROd1do20r3lsvfbtennpasdfbgdsvsd34',
            resave: false,
            saveUninitialized: false,
            store: new TypeormStore({
                cleanupLimit: 2,
                limitSubquery: false, // If using MariaDB.
                ttl: 86400
            }).connect(sessionRepository),
            cookie: {
                secure: false,
                path: '/', httpOnly: false,
                maxAge: 1000 * 60 * 60 //1H
            }
        }));

        //Uncomment this if you want to create initial admin user into db
        createInitialUser()

        app.post("/login", async (req, res) => await new cmds.LoginCommand().execute(req, res))
        app.get("/validate-login", checkSes, async (req, res) => await new cmds.LoginCommand().execute(req, res))
        app.post("/logout", async (req, res) => await new cmds.LogOutCommand().execute(req, res))

        app.post("/user", checkSes, async (req, res) => await new cmds.CreateUserCommand().execute(req, res))
        app.delete("/user", checkSes, async (req, res) => await new cmds.DeleteUserCommand().execute(req, res))

        app.post("/transaction", checkSes, async (req, res) => await new TransactionCommand(new cmds.OperationCreateTansaction()).execute(req, res))
        app.put("/transaction", checkSes, async (req, res) => await new TransactionCommand(new cmds.OperationChangeTransaction()).execute(req, res))
        app.delete("/transaction", checkSes, async (req, res) => await new TransactionCommand(new cmds.OperationCancelTransaction()).execute(req, res))
        app.get("/transaction", checkSes, async (req, res) => await new ViewTransactionsCommand().execute(req, res));

        app.post("/request", checkSes, async (req, res) => await new cmds.CreateRequestCommand().execute(req, res))
        app.get("/request", checkSes, async (req, res) => await new cmds.ViewRequestsCommand().execute(req, res));
        app.put("/request", checkSes, async (req,res) => await new cmds.FulfillRequestCommand().execute(req,res));

        app.get("/history",checkSes, async(req,res) => await new cmds.ViewHistoryCommand().execute(req,res));

        app.listen(3000, () => {
            console.log("Server started on port 3000!");
        });
    })
    .catch(error => console.log(error));