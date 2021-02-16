import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {AccountContent} from "./AccountContent";
import {TransactionHistory} from "./TransactionHistory";
import {TransactionsIncomingRequests} from "./Transactions/TransactionsIncomingRequests";
import {MoneyOperations} from "./Transactions/MoneyOperations";
import styles from "../assets/styles/Account.module.css";
import {AdminOperations} from "./Admin/AllOperations";
import {AllAccounts} from "./Admin/AllAccounts";
import {EditTransactions} from "./Admin/EditTransactions";
import {CreateTransaction} from "./Admin/CreateTransaction";

export const AccountHeader = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar>
        <Tabs centered value={value} onChange={handleChange}>
          <Tab label="Account" />
          <Tab label="Transactions" />
          <Tab label="Admin's" />
        </Tabs>
      </AppBar>
      <div className={styles.containerContent}>
        {
          value === 0 && (
            <>
              <AccountContent
                user={{userName: "Hans", balance: 8000, id: "JSJHHD"}}
                value={value}
                index={0}
              />
              <TransactionHistory
                transactionHistory={[{id: 1, account: 'Helen Tera', description: "bribe", amount: 30}, {
                  id: 2,
                  account: 'Kirill Maksimov',
                  description: "A bigger bribe!",
                  amount: 50
                }]}
              />
            </>
          )
        }
        {
          value === 1 && (
            <div className={styles.contentContainer}>
              <TransactionsIncomingRequests receiver={{ receiverName: "Helen", amount: 50,  }}/>
              <MoneyOperations receiver={{ receiverName: "Helen", amount: 50,  }} />
            </div>
          )
        }
        {
          value === 2 && (
            <div className={styles.contentContainer}>
              <AdminOperations />
              <AllAccounts accounts={[{name: "Helen"}]} />
              <EditTransactions transactions={[{from: "Helen", to: "Hans", amount: 10, desc: "string"}]} />
              <CreateTransaction />
            </div>
          )
        }
      </div>
    </>
  )
};