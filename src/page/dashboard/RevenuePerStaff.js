import * as React from 'react';
import {
    Avatar,
    Box,
    Button, Chip,
    List,
    ListItem,
    ListItemAvatar, ListItemSecondaryAction,
    ListItemText, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import {useTranslate, useQueryWithStore, ReferenceField} from 'react-admin';
import {format, subDays} from 'date-fns';

import CardWithIcon from './CardWithIcon';
import UserLinkField from "../user/UserLinkField";


const RevenuePerStaff = () => {
    const translate = useTranslate();
    const classes = useStyles();

    const aMonthAgo = subDays(new Date(), 30);
    aMonthAgo.setDate(aMonthAgo.getDate() - 30);
    aMonthAgo.setHours(0);
    aMonthAgo.setMinutes(0);
    aMonthAgo.setSeconds(0);
    aMonthAgo.setMilliseconds(0);

    const { loaded, data: employees } = useQueryWithStore({
        type: 'getList',
        resource: 'employees-revenue',
        payload: {
            filter: {
                date: format(new Date(),"yyyy-MM-dd") ,
            },
            sort: { field: 'id', order: 'DESC' },
            pagination: { page: 1, perPage: 10 },
        },
    });

    if (!loaded) return null;
    if(loaded){
        console.log(employees)
    }

    const nb = employees ? employees.reduce((nb) => ++nb, 0) : 0;
    return (
        <CardWithIcon
            to="/customers"
            icon={CustomerIcon}
            title={translate('pos.dashboard.revenue.today')}
            subtitle={nb}
        >
            <List>
                {employees
                    ? employees.map((record) => (
                        <ListItem
                            button
                            to={`/employees-revenue/${record.id}`}
                            component={Link}
                            key={record.id}
                        >
                            <ListItemAvatar>
                                <Avatar src={`${record.avatar}?size=32x32`} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${record.revenue.toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'vnd',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })}`}
                                secondary={`${record.fullName}`}
                            />
                            <ListItemSecondaryAction>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="span"
                                >
                                    {

                                    }
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                    : null}
            </List>
            <Box flexGrow="1">&nbsp;</Box>
            <Button
                className={classes.link}
                component={Link}
                to="/employees-revenue"
                size="small"
                color="primary"
            >
                <Box p={1} className={classes.linkContent}>
                    {translate('pos.dashboard.employee')}
                </Box>
            </Button>
        </CardWithIcon>
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

export default RevenuePerStaff;
