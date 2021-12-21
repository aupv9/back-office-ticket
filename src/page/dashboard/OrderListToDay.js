import * as React from 'react';
import {
    Avatar,
    Box,
    Button, Card, Chip,
    List,
    ListItem,
    ListItemAvatar, ListItemSecondaryAction,
    ListItemText, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {useTranslate, useQueryWithStore, ReferenceField} from 'react-admin';
import {format, subDays} from 'date-fns';

import CardHeader from "@material-ui/core/CardHeader";


const OrderListToDay = (props) => {
    const {orders} = props;
    const translate = useTranslate();
    const classes = useStyles();

    const aMonthAgo = subDays(new Date(), 30);
    aMonthAgo.setDate(aMonthAgo.getDate() - 30);
    aMonthAgo.setHours(0);
    aMonthAgo.setMinutes(0);
    aMonthAgo.setSeconds(0);
    aMonthAgo.setMilliseconds(0);


    if (!orders) return null;

    const nb = orders ? orders.reduce((nb) => ++nb, 0) : 0;

    return (
        <Card className={classes.root}>
            <CardHeader title={translate('pos.dashboard.list_order_today')} />
            <List dense={true}>
                {orders.map(record => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/commands/${record.id}`}
                    >
                        <ListItemAvatar>
                            {orders[record.customer_id] ? (
                                <Avatar
                                    src={`${
                                        orders[record.customer_id].avatar
                                    }?size=32x32`}
                                />
                            ) : (
                                <Avatar />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${new Date(record.createdDate).toLocaleDateString()}`}
                            secondary={
                                <>

                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <span className={classes.cost}>
                                {record.total}$
                            </span>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

const useStyles = makeStyles(theme => ({
    link: {
        borderRadius: 0,
    },
    linkContent: {
        color: theme.palette.primary.main,
    },
}));

export default OrderListToDay;
