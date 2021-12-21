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
import {Status} from "./Status";


const RevenuePerStaff = () => {
    const translate = useTranslate();
    const classes = useStyles();
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

    const nb = employees ? employees.reduce((nb) => ++nb, 0) : 0;
    return (
        <CardWithIcon
            to="/employees-revenue"
            icon={CustomerIcon}
                title={translate('pos.dashboard.list_employee_today')}
            subtitle={nb}
        >
            {
                employees &&  <List dense={true}>
                    { employees.map(record => (
                        <ListItem
                            key={record.id}
                            button
                            component={Link}
                            to={`/employees-revenue/${record.id}`}
                        >
                            <ListItemAvatar>
                                {employees[record.id] ? (
                                    <Avatar
                                        src={`${
                                            employees[record.id].avatar
                                        }?size=32x32`}
                                    />
                                ) : (
                                    <Avatar />
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${new Date(record.startsAt).toLocaleDateString()} - ${new Date(record.endsAt).toLocaleDateString()}` }
                                secondary={
                                    <>
                                        {record["fullName"]}
                                        <Status status={record["online"]} />
                                    </>
                                }
                            />
                            <ListItemText
                                primary={`Count :${record.countOrder}`}
                            />
                            <ListItemSecondaryAction>
                            <span className={classes.cost}>
                                {record.revenue.toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'vnd',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })}
                            </span>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            }

            <Box flexGrow="1">&nbsp;</Box>
            <Button
                className={classes.link}
                component={Link}
                to="/employees-revenue"
                size="small"
                color="primary"
            >
                <Box p={1} className={classes.linkContent}>
                    {translate('pos.dashboard.all_employee')}
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
