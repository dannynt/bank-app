import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from '../assets/styles/Account.module.css'

export const AccountContent = (props) => {
  return (
    <section className={styles.card}>
      <Card>
        <CardContent className={styles.cardContent}>
          <b>Account Owner:</b> {props.user.userName}
        </CardContent>
        <CardContent className={styles.cardContent}>
          <b>Account ID:</b> {props.user.id}
        </CardContent>
        <CardContent className={styles.cardContent}>
          <b>Balance:</b> {props.user.balance} €
        </CardContent>
      </Card>
    </section>
  )
};