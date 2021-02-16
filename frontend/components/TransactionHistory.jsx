import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "@material-ui/core/Card";
import styles from '../assets/styles/Account.module.css';

export const TransactionHistory = (props) => {
    const TABLE_HEAD = ["Account", "Description", "Amount"];

    return (
        <section className={styles.card}>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            {TABLE_HEAD.map((tableTitle, i) => <TableCell key={i}><b>{tableTitle}</b></TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.transactionHistory.map((content) => (
                            <TableRow key={content.id}>
                                <TableCell>{content.account}</TableCell>
                                <TableCell>{content.description}</TableCell>
                                <TableCell>{content.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </section>
    )
};