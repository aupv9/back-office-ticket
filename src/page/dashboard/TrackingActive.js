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
import {useTranslate, useQueryWithStore, ReferenceField, DateField} from 'react-admin';
import {format, subDays} from 'date-fns';

import CardWithIcon from './CardWithIcon';
import {Status} from "./Status";
import {Timeline} from "@material-ui/icons";

const convertCodeToString = value =>{
    switch (value) {
        case "MO":
            return "Update";
        case "CE":
            return "Create";
        case "DL":
            return "Delete";
        default:
            break;
    }

}



const TrackingActive = () => {
    const translate = useTranslate();
    const classes = useStyles();
    const { loaded, data: events } = useQueryWithStore({
        type: 'getList',
        resource: 'events',
        payload: {
            filter: {
                date: format(new Date(),"yyyy-MM-dd") ,
            },
            sort: { field: 'actionDate', order: 'DESC' },
            pagination: { page: 1, perPage: 20 },
        },
    });

    if (!loaded) return null;

    const nb = events ? events.reduce((nb) => ++nb, 0) : 0;
    console.log(events)


    return (
        <CardWithIcon
            to="/employees-revenue"
            icon={Timeline}
            title={translate('pos.dashboard.timeline')}
            subtitle={nb}
        >
            {
                events &&  <List dense={true}>
                    { events.map(record => (
                        <ListItem
                            key={record.id}
                            button
                            // component={Link}
                            // to={`/employees-revenue/${record.id}`}
                        >
                            <DateField/>
                            <ListItemAvatar>
                                {events[record.id] ? (
                                    <Avatar
                                        src={`${
                                            events[record.id].author.avatar
                                        }?size=32x32`}
                                    />
                                ) : (
                                    <Avatar />
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={ `${record.author["fullName"]} ${convertCodeToString(record.action)} ${record.resourceName} ` }
                                secondary={
                                    <>
                                        {new Date(record.actionDate).toLocaleString()}
                                    </>
                                }
                            />
                            {/*<ListItemText*/}
                            {/*    primary={`Count :${record.countOrder}`}*/}
                            {/*/>*/}
                            <ListItemSecondaryAction>
                            {/*<span className={classes.cost}>*/}
                            {/*    {record.revenue.toLocaleString(undefined, {*/}
                            {/*        style: 'currency',*/}
                            {/*        currency: 'vnd',*/}
                            {/*        minimumFractionDigits: 0,*/}
                            {/*        maximumFractionDigits: 0,*/}
                            {/*    })}*/}
                            {/*</span>*/}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            }

            <Box flexGrow="1">&nbsp;</Box>
            {/*<Button*/}
            {/*    className={classes.link}*/}
            {/*    component={Link}*/}
            {/*    to="/employees-revenue"*/}
            {/*    size="small"*/}
            {/*    color="primary"*/}
            {/*>*/}
            {/*    <Box p={1} className={classes.linkContent}>*/}
            {/*        {translate('pos.dashboard.all_employee')}*/}
            {/*    </Box>*/}
            {/*</Button>*/}
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

export default TrackingActive;
