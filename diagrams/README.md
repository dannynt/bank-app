# System architecture
Arhitecture report of Bank Application
## User stories and use cases

[User Stories and use cases](stories_and_use_cases.md)
## Personas
[Personas](Bank_Personas.pdf)
## Event-storming
[Event-storming and software stories](./Eventstorming/README.md)
## Structure
The main structure consist of two different runtime environments next.js and node.js. node.js is used in the backend to handle requests from the front-end next.js environment. Default database handling system that is used is MySQL. We gained a lot of predefined functionality with the given frameworks such as request handling, cookie handling, etc. so we didn't have to worry about these things.
### Node.js
In the backend we used typescript since we wanted to have object-oriented approach to create diagrams. We also used some of the frameworks: express, cookie-parser, bcryptjs, class-validator, typeorm, etc.. You can find the rest of them under the [package](../backend/package.json). 
### Next.js
We used next.js React framework in the frontend since it is good to implement web GUI's with them using javascript and typescript.

## How to run
### Backend
For running the server you need to first have a mysql database running. Then you need to configure the file ormconfig.json for the database. After that run the following commands to install and run the back-end server:
``` javascript
npm install // for installing the dependencies (one-time).
npm run start:dev // start the server
```
### Frontend
First you need to go to frontend directory "\project-bank\frontend" and enter commands:
``` javascript
npm install // for installing the dependencies (one-time).
npm run dev // start the server
```

Then open your web browser and go to "localhost:4000/".

## Design patterns used
Design patterns are quite common in the API-s nowadays. Different frameworks can use more than 10 patterns in a simple implementation. Since the goal was to implement some of the patterns we tried to find where we can use some of the patterns. We managed to implement two patterns in the backend and x patterns in the frontend. Some of the patterns that we used in the project are noted here aswell to show that API-s already provide us necessary patters so that we don't have to implement them.

### **Backend**
The two patterns that we implemented in the backend is strategy pattern and command pattern. We also used middleware, factory and decorator pattern from express framework. The frameworks also provide patterns such as Singleton, Lazy Initialization, Event Emitter etc., but we didn't had any use to demonstrate, so we kept only the ones we had use for.
- Command pattern - Command pattern was used for handling the requests. Reason on why implemented this is that it seemed easier to handle each request on the single spot where we could first initialize the class as we wanted first and after that execute the incoming request on that class. We had a abstract base class that had a function execute(req, res), that was extended and used for each subclass.
- Strategy pattern - Strategy pattern was one of the patterns we implemented by ourselves. It is used in the Transaction command, where the fields checking is done in the main command class and the specific behavior on the transaction(Update, Add, Remove) is done with the specific strategy what is given to the main class.
- Factory pattern - Since we used express framework, we used factory pattern by default where it exports the facrory on the creation of the express instance.  
- [Middleware pattern](https://dzone.com/articles/understanding-middleware-pattern-in-expressjs) - This pattern is also connected with the express application. We didn't implement it by ourselves, but we used it for authentication. How pattern works is that instead of having only parameters request and result, it also has an extra parameter called next. So we can stack multiple functions on eachother with same parameters going through it. Example on how it could be used seen next where it first checks, if user is logged in and after that it executes the given command. When the user authentication fails, we could already return at that point:
```javascript 
function(req, res, next) {} // Default structure of the function
app.post("/user", checkSes, new cmds.CreateUserCommand().execute)
```
- Decorator pattern - We used decorator pattern while authenticating the user. After authentication, we add a new field to the request called user, so we could use it in the next functions in the middleware pattern. Decorator pattern allows us to extend the object behavior dynamically. It's different from classical inheritance since the new behavior is added during the runtime.
```javascript 
req.body.user = await GetUserFromId(req, res);
```
### **Frontend**
In the front-end API we did not implement any specific patterns. We used the tools provided by next.js and React. 

## Wireframes
| wireframe|Scenario ID's| version| Previous Versions|
|-----|-------|------|---|
[Login view](./Wireframes/Login.png)| Auth-UC1| 0.1| -
[Admin view](./Wireframes/Admin_view.png)| AuthReq2, UserReq1, UserReq2, FundsReq2, TransReq2, TransReq3, TransReq5| 0.1| -
[User view](./Wireframes/User_view.png)| FundsReq1,TransReq4,AuthReq2 | 0.1| -
[Transaction view](./Wireframes/Transaction_view.png)| TransReq1, TransReq3| 0.1| -
## Class diagrams
| Diagram| version| Previous Versions|
|-----|-------|------|
|[Class diagram of backend](Bank_Class_Diagram_v2.png)|0.2|[0.1](Bank_Class_Diagram.pdf)
## Component diagram
| Diagram| version| Previous Versions|
|-----|-------|------|
[Component diagram](Bank_Component_Diagram.pdf)|0.1|-
## Deployment diagram
| Diagram| version| Previous Versions|
|-----|-------|------|
[Deployment diagram](bank_deployment_diagram_v2.png)|0.2|[0.1](bank_deployment_diagram.png)
## Sequence diagrams
| Diagram| Scenario ID's| version| Previous Versions
|-----|-------|-------|------|
[Add user](./Sequence_diagrams/AddUser.png)| User-UC1| 0.1|-
[Remove user](./Sequence_diagrams/RemoveUser.png)| User-UC2| 0.1|-
[Login](./Sequence_diagrams/Login.png)| Auth-UC1| 0.1|-
[Logout](./Sequence_diagrams/Logout.png)| Auth-UC2| 0.1|-
[Get transactions](./Sequence_diagrams/GetTransaction0_2.png)| Funds-UC1, Trans-UC4| 0.2 | [0.1](./Sequence_diagrams/GetTransaction.png)
[Make transaction](./Sequence_diagrams/MakeTransaction0_2.png)| Funds-UC2, Trans-UC1 | 0.2|[0.1](./Sequence_diagrams/MakeTransaction.png)
[Change transaction](./Sequence_diagrams/ChangeTransaction.png)| Trans-UC3 | 0.1|-
[Delete transaction](./Sequence_diagrams/DeleteTransaction.png)| Trans-UC2, Trans-UC5 | 0.1|-

## Object diagrams
| Diagram| Scenario ID| version
|-----|-------|-------
|[Transferring funds and add/delete user](Bank_Object_Diagrams.pdf)|Funds-UC2, Trans-UC1, User-UC1, User-UC2 |0.1


