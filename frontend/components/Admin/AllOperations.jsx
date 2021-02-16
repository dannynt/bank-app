import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styles from '../../assets/styles/Transaction.module.css';

export const AdminOperations = (props) => {
    return (
        <form className={styles.card}>
            <Card>
                <CardContent>
                    <Typography>Create Account</Typography>
                </CardContent>
                <CardContent>
                    <TextField label="User name" variant="outlined" />
                </CardContent>
                <CardContent>
                    <TextField label="Password" variant="outlined" />
                </CardContent>
                <Button variant="contained">Create</Button>
            </Card>
        </form>
    )
};