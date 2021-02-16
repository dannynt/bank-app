import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styles from '../../assets/styles/Transaction.module.css';

export const MoneyOperations = () => {
  return (
    <form className={styles.card}>
      <Card>
        <CardContent className={styles.cardContent}>
          <Typography>Operations</Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <TextField label="Recipient's ID" variant="outlined" />
        </CardContent>
        <CardContent className={styles.cardContent}>
          <TextField label="Description" variant="outlined" />
        </CardContent>
        <CardContent className={styles.cardContent}>
          <TextField label="Amount" variant="outlined" />
        </CardContent>
        <Button variant="contained" >Send</Button>
        <Button variant="contained" className={styles.operationButton}>Request</Button>
      </Card>
    </form>
  )
};