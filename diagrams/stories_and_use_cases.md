# Functional Requirements

## User Stories

###  Authentication
---
| id       | AuthReq1                                                |
|----------|---------------------------------------------------------|
| story    | As a user I want to be able to log in to the system.    |
| roles    | client, admin                                           |
---
| id       | AuthReq2                                                |
|----------|---------------------------------------------------------|
| story    | As a user I want to be able to log out from the system. |
| roles    | client, admin                                           |
---

###  User Management
---
| id       | UserReq1                                                |
|----------|-------------------------------------------------------- |
| story    | As an admin I want to be able to create a user.         |
| roles    | admin                                                   |
---
| id       | UserReq2                                                |
|----------|-------------------------------------------------------- |
| story    | As an admin I want to be able to delete a user.         |
| roles    | admin                                                   |
---

### Funds
---
| id       | FundsReq1                                               |
|----------|-------------------------------------------------------- |
| story    | As a user I want to be able to view my funds.           |
| roles    | admin, user                                             |
---
| id       | FundsReq2                                                    |
|----------|--------------------------------------------------------------|
| story    | As an administrator I want to be able to add funds to users. |
| roles    | admin                                                        |
---

### Transactions
---
| id       | TransReq1                                                   |
|----------|-------------------------------------------------------------|
| story    | As a user I want to be able transfer funds to other users.  |
| roles    | admin, user                                                 |
---
| id       | TransReq2                                                                                         |
|----------|---------------------------------------------------------------------------------------------------|
| story    | As a user I want to be able transfer funds to cancel a transaction to not send funds by mistake.  |
| roles    | admin, user                                                                                       |
---
| id       | TransReq3                                                                                         |
|----------|---------------------------------------------------------------------------------------------------|
| story    | As a user I want to be able transfer funds to change a transaction to not send funds by mistake.  |
| roles    | admin, user                                                                                       |
---
| id       | TransReq4                                                                               |
|----------|-----------------------------------------------------------------------------------------|
| story    | As a user I want to be able to see all transactions I have made to keep track of them.  |
| roles    | admin, user                                                                             |
---
| id       | TransReq5                                                                             |
|----------|---------------------------------------------------------------------------------------|
| story    | As an admin I want to be able to undo transactions to fix any mistakes made by users. |
| roles    | admin                                                                                 |
---


---

## Use Cases

###  Authentication

---
| ID               | Auth-UC1                                                                                     |
|------------------|----------------------------------------------------------------------------------------------|
| Title            | Logging in to system                                                                         |
| Requirement      | AuthReq1                                                                                     |
| Description      | User is going to log in to the system.                                                       |
| Primary Actor    | Client or administrator                                                                      |
| Preconditions    | In the system exists user with username "ulno@ulno.net" and with password "password". User is in the logging view of the application.        |
| Postconditions   | User is logged in                                                                                                                                        |
| Main flow        | 1. -> User enters username "ulno@ulno.net".<br>2. -> User enters password "password".<br>3. <- System authenticates the user.<br> 4. <- System notifies that user is logged in.|
| Alternative flow | 3.1. -> System notifies that username and password are incorrect.<br>|
---

---
| ID               | Auth-UC2                                                                                     |
|------------------|----------------------------------------------------------------------------------------------|
| Title            | Logging out from the system                                                                  |
| Requirement      | AuthReq2                                                                                     |
| Description      | User is going to log out from the system.                                                    |
| Primary Actor    | Client or administrator                                                                      |
| Preconditions    | In the system exists user with username "ulno@ulno.net" and with password "password" and is logged in. User is in the user view of the application. |
| Postconditions   | User is logged out                                                                           |
| Main flow        | 1. -> User presses log out button. 2. <- The system logs the user out. 3. <- The system notifies that user has been logged out successfully.|
| Alternative flow | -|
---


###  User Management


---
| ID               | User-UC1                                                                                     |
|------------------|----------------------------------------------------------------------------------------------|
| Title            | Creating an account                                                                          |
| Requirement      | UserReq1                                                                                     |
| Description      | Admin is going to create an account.                                                         |
| Primary Actor    | Administrator                                                                                |
| Preconditions    | There is admin user in the system.<br>Admin is logged in.<br>Admin is in the admin view of the application. |
| Postconditions   | New account created.                                                                         |
| Main flow        | 1. -> Admin fills "Owner's name" field in create account section.<br>2. -> Admin fills "Password" field in the create account section.<br>3. -> Admin clicks on the "Create Account" button.<br>4. <- The system creates new account with admin input.<br>5. <- The system notifies that new account is created.|
| Alternative flow | 4. <- The system notifies that user with this "Owner's name" already exists.<br>5. continue with Main flow 1.|
---
| ID               | User-UC2                                                                                     |
|------------------|----------------------------------------------------------------------------------------------|
| Title            | Deleting an account                                                                          |
| Requirement      | UserReq2                                                                                     |
| Description      | Admin is going to delete an account.                                                         |
| Primary Actor    | Administrator                                                                                |
| Preconditions    | There are two users in the system: admin and a client.<br>Admin is logged in.<br>Admin is in the admin view of the application. |
| Postconditions   | Existing client account is deleted.                                                          |
| Main flow        | 1. -> Admin clicks on "delete account" button next to the specific client user which they want to delete.<br>2. <- The system deletes the account.<br>3. <- The system notifies that the account is deleted.|
| Alternative flow | -|
---


### Funds
---
| ID               | Funds-UC1                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Viewing funds                                                                                 |
| Requirement      | FundReq1                                                                                      |
| Description      | User is viewing their funds.                                                                  |
| Primary Actor    | Client or administrator                                                                       |
| Preconditions    | User is logged in to the system. User has funds in the application. User is in the user view. |
| Postconditions   | User can see their funds                                                                      |
| Main flow        | 1. <- User can see their funds in the balance field.                                          |
| Alternative flow | -                                                                                             |
---
| ID               | Funds-UC2                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Adding funds                                                                                  |
| Requirement      | FundReq2                                                                                      |
| Description      | Admin is adding funds to user.                                                                |
| Primary Actor    | Administrator                                                                                 |
| Preconditions    | There are two users in the system: admin and a client.<br>Admin is logged in.<br>Admin is in the admin view of the application. |
| Postconditions   | Client user has now more funds.                                                                      |
| Main flow        |  1. -> Admin fills "Recipient's Account ID" field in create transaction section.<br>2. -> Admin fills "Description" field in the create transaction section.<br>3. -> Admin fills "Amount" field in the create transaction section.<br>4. -> Admin fills "Sender's Account ID" field in the create transaction section.<br>5. Admin clicks on "Send money" button.<br>6. <- The system adds funds to the recipient's account.<br>7. <- The system notifies that the recipient has now additional funds.|
| Alternative flow | 6. <- The system notifies that there is a mistake in user input.<br>7. Continue with the main flow section 1.|
---
| ID               | Funds-UC3                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Requesting funds                                                                                  |
| Requirement      | FundReq3                                                                                     |
| Description      | User is requesting funds from other user.                                                                |
| Primary Actor    | Administrator                                                                                 |
| Preconditions    | There are two clients in the system A and B. <br> Client A is in Transactions view.|
| Postconditions   | Client B has now a money request from client A which they can decline or accept.                                                                      |
| Main flow        |  1. -> The user fills "Recipient's Account ID" field in request money section.<br>2. -> The user fills "Description" field in the request money section.<br>3. -> The user fills "Amount" field in the request money section.<br>4. -> The user fills "Sender's Account ID" field in the create transaction section.<br>5. The user clicks on "Request money" button.<br>6. <- The system notifies that the request has been sent. |
| Alternative flow | - |
---


### Transactions
| ID               | Trans-UC1                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Transfer funds to other users.                                                                |
| Requirement      | TransReq1                                                                                     |
| Description      | User is creating a transcation                                                                |
| Primary Actor    | Administrator, client                                                                         |
| Preconditions    | User is logged in.<br>User is in the "transactions" view of the application.                  |
| Postconditions   | Transaction committed                                                                         |
| Main flow        |  1. -> User fills "Recipient's Account ID" field in the "send money" section.<br>2. -> User fills "Description" field in the "send money" section.<br>3. -> User fills "Amount" field in the "send money" section.<br>4. -> User clicks on "Send money" button in the "send money section".<br>5. -> The system creates the transaction.<br>6. -> The system notifies the user that transaction is successful.|
| Alternative flow | 5.1. <- The system notifies that there is a mistake in user input.<br>5.2. Continue with the main flow section 1.|
---
| ID               | Trans-UC2                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Cancel making a transaction.                                                                  |
| Requirement      | TransReq2                                                                                     |
| Description      | User is canceling making a transaction.                                                       |
| Primary Actor    | Administrator, client                                                                         |
| Preconditions    | User is logged in.<br>User is in the "transactions" view of the application.                  |
| Postconditions   | Transaction canceled                                                                          |
| Main flow        |  1. -> User fills "Recipient's Account ID" field in the "send money" section.<br>2. -> User fills "Description" field in the "send money" section.<br>3. -> User fills "Amount" field in the "send money" section.<br>4. -> User decides to cancel transaction and does not nothing more.
| Alternative flow | - |
---
| ID               | Trans-UC3                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Changing transaction funds amount                                                             |
| Requirement      | TransReq3                                                                                     |
| Description      | User is changing transaction funds amount.                                                    |
| Primary Actor    | Administrator, client                                                                         |
| Preconditions    | User is logged in.<br>User is in the "transactions" view of the application.                  |
| Postconditions   | Transaction amount changed                                                                    |
| Main flow        |  1. -> User fills "Recipient's Account ID" field in the "send money" section.<br>2. -> User fills "Description" field in the "send money" section.<br>3. -> User fills "Amount" field in the "send money" section.<br>4. -> User changes the amount of transaction.<br>5. -> User clicks on "Send money" button in the "send money section".<br>6. -> The system creates the transaction.<br>7. -> The system notifies the user that transaction is successful.|
| Alternative flow | 6.1. <- The system notifies that there is a mistake in user input.<br>6.2. Continue with the main flow section 1.|
---
| ID               | Trans-UC4                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Viewing all transactions                                                                      |
| Requirement      | TransReq4                                                                                     |
| Description      | User can see all transactions.                                                                |
| Primary Actor    | Administrator, client                                                                         |
| Preconditions    | User is logged in.                                                                            |
| Postconditions   | All transactions shown to user.                                                               |
| Main flow        | 1. -> User moves to "transactions" view.<br>2. <- System shows all transactions to user.      |
| Alternative flow ||
---
| ID               | Trans-UC5                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------|
| Title            | Undoing a transaction                                                                         |
| Requirement      | TransReq5                                                                                     |
| Description      | Admin is undoing a transaction.                                                               |
| Primary Actor    | Administrator                                                                                 |
| Preconditions    | There are two users in the system: admin and a client.<br>Admin is logged in.<br>Admin is in the admin view of the application.<br>Client has made a transaction.|
| Postconditions   | Existing transaction undone.                                                                   |
| Main flow        | 1. -> Admin presses on the "Modify" button of the specific transaction they want to undo.<br>2. -> Admin presses "Delete transaction" button.<br>3. <- System rollbacks the specific transaction.<br>4. <- System notifies that the specific transaction is undone.|
| Alternative flow | - |
---
