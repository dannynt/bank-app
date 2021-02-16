import React from 'react';
import Typography from '@material-ui/core/Typography';
import styles from '../../assets/styles/Transaction.module.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const CreateTransaction = (props) => {
  return (
    <form className={styles.card}>
      <Card>
        <CardContent>
          <Typography>Create Transaction</Typography>
        </CardContent>
        <CardContent>
          <TextField label="Recipient" variant="outlined" />
        </CardContent>
        <CardContent>
          <TextField label="Sender" variant="outlined" />
        </CardContent>
        <CardContent>
          <TextField label="Amount" variant="outlined" />
        </CardContent>
        <CardContent>
          <TextField label="Description" variant="outlined" />
        </CardContent>
        <Button variant="contained">Create</Button>
      </Card>
    </form>
  );
};
