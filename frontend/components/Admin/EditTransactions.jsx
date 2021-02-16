import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import styles from '../../assets/styles/Transaction.module.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const EditTransactions = (props) => {
  return (
    <form className={styles.card}>
      <Table>
        <TableBody>
          {props.transactions.map((transaction, i) => (
            <TableRow key={i}>
              <TextField>
                <Typography>{transaction.from}</Typography>
              </TextField>
              <TextField>
                <Typography>{transaction.to}</Typography>
              </TextField>
              <TextField>
                <Typography>{transaction.desc}</Typography>
              </TextField>
              <TextField>
                <Typography>{transaction.amount}</Typography>
              </TextField>
              <TableCell>
                <Button variant="contained">Modify</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
};
