import * as React from 'react';
import { useState } from 'react';
import { Paper, Typography, Link as MuiLink } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/AccountCircle';
import DealIcon from '@material-ui/icons/MonetizationOn';
import {linkToRecord, SelectField, useGetOne} from 'react-admin';
import { Link } from 'react-router-dom';
import {LocationCity, LocationCitySharp, TheatersRounded} from "@material-ui/icons";




const useStyles = makeStyles(theme => ({
    paper: {
        height: 200,
        width: 193.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1em',
    },
    identity: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    name: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
    },
    stats: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    singleStat: {
        display: 'flex',
        alignItems: 'center',
    },

    statIcon: {
        marginRight: theme.spacing(1),
    },
    avatar: {
        width: 100,
        height: 100,
        backgroundColor: 'aliceblue',
    },
    img: {
        objectFit: 'contain',
    },
    small: {
        width: 20,
        height: 20,
    },
    large: {
        width: 40,
        height: 40,
    },

}));

export const LocationCard = ({ record } ) => {
    const classes = useStyles();
    const [elevation, setElevation] = useState(1);
    const { data, loading, error } = useGetOne('location-theater', record.id);
    return (
        <MuiLink
            component={Link}
            to={linkToRecord('/locations', record.id, 'show')}
            underline="none"
            onMouseEnter={() => setElevation(3)}
            onMouseLeave={() => setElevation(1)}
        >
            <Paper className={classes.paper} elevation={elevation}>
                <div className={classes.identity}>
                    {/*<CompanyAvatar record={record} />*/}
                    <LocationCitySharp className={classes.avatar} color="disabled"/>
                    <div className={classes.name}>
                        <Typography variant="subtitle2">
                            {record.name}
                        </Typography>

                    </div>
                </div>
                <div className={classes.stats}>
                    <div className={classes.singleStat}>
                        <TheatersRounded
                            color="disabled"
                            className={classes.statIcon}
                        />
                        <div>
                            <Typography
                                variant="subtitle2"
                                style={{ marginBottom: -8 }}
                            >
                                {data ? data.id : 0}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {data && data.id > 1
                                    ? 'theaters'
                                    : 'theater'}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.singleStat}>
                        <DealIcon
                            color="disabled"
                            className={classes.statIcon}
                        />
                        <div>
                            <Typography
                                variant="subtitle2"
                                style={{ marginBottom: -8 }}
                            >
                                {/*{record.nb_deals}*/}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {/*{record.nb_deals > 1 ? 'deals' : 'deal'}*/}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Paper>
        </MuiLink>
    );
};
