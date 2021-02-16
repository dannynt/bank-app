import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../../assets/styles/Transaction.module.css';

export const TransactionsIncomingRequests = (props) => {
  return (
    <section className={styles.card}>
      <Card>
        <CardContent className={styles.cardContent}>
          <Typography>Requested</Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <div>Receiver:</div>
          <div>{props.receiver.receiverName}</div>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <div>Amount:</div>
          <div>{props.receiver.amount}</div>
        </CardContent>
        <CardContent className={styles.cardContent} />
        <Button variant="contained" className={styles.operationButton}>Pay</Button>
      </Card>
    </section>
  )
};