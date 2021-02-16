import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import styles from '../../assets/styles/Transaction.module.css';
import Button from "@material-ui/core/Button";

export const AllAccounts = (props) => {
  return (
    <section className={styles.card}>
      <Table>
        <TableBody>
          {props.accounts.map((account, i) => (
            <TableRow key={i}>
              <TableCell>
                <Typography>{account.name}</Typography>
              </TableCell>
              <TableCell>
                <Button variant="contained">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
};