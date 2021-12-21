import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    useShowController,
    Loading,
    translate,
    useGetOne,
} from 'react-admin';
import {Box, Button, CardActions} from "@material-ui/core";
import SeatTotals from "./SeatTotal";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {useEffect, useRef, useState} from "react";
import {CodeRounded} from "@material-ui/icons";
import TotalShow from "../showtimes/TotalShow";

import image from '../../image/Screenshot 2021-12-21 215401.png'



const CustomerField = ({ record }) =>
    record ? (
        <Typography>
            {record.first_name} {record.last_name}
            <br />
            {record.address}
            <br />
            {record.city}, {record.zipcode}
        </Typography>
    ) : null;

const TicketShow = (props) => {
    const { record } = useShowController(props);
    const [seatsPrice, setSeatsPrice] = useState(0);

    const classes = useStyles();
    const {data:show} =useGetOne("showTimesDetails",record["showTimesDetailId"]);
    useEffect(() =>{
        if(show && record.seats){
            setSeatsPrice(show.price * record.seats.length);
        }
    },[record])

    const componentRef = useRef(null);

    const [isPrint,setIsPrint] = useState(false);

    const onBeforeGetContentResolve = useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("old boring text");

    const handleAfterPrint = React.useCallback(() => {
        console.log("`onAfterPrint` called"); // tslint:disable-line no-console
    }, []);

    const handleBeforePrint = React.useCallback(() => {
        console.log("`onBeforePrint` called"); // tslint:disable-line no-console
    }, []);

    const handleOnBeforeGetContent = React.useCallback(() => {
        console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
        setLoading(true);
        setText("Loading new text...");

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText("New, Updated Text!");
                resolve();
            }, 2000);
        });
    }, [setLoading, setText]);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "AwesomeFileName",
        onBeforeGetContent: handleOnBeforeGetContent,
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
        removeAfterPrint: true
    });

    React.useEffect(() => {
        if (
            text === "New, Updated Text!" &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, text]);

    const reactToPrintTrigger = React.useCallback(() => {
        // setIsPrint(true)
        return (
            <Button
                color="primary"
                variant="contained"
                size="small"
                startIcon={<CodeRounded />}
            >
                Export Ticket
            </Button>
        ); // eslint-disable-line max-len
    }, []);

    if (!record) return null;

    return (

        <div style={{display:"flex"}} >
            <Card className={classes.root} >
                <CardContent ref={componentRef}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom>
                                Tom Ticket
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom align="right">
                                Code: {record.code}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} container alignContent="flex-end">
                        </Grid>
                    </Grid>
                    <div className={classes.spacer}>&nbsp;</div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom align="center">
                                Date{' '}
                            </Typography>
                            <Typography gutterBottom align="center">
                                {new Date(record.createdDate).toLocaleDateString()}
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                        </Grid>
                    </Grid>
                    <div className={classes.invoices}>
                        {
                            record && show ? <SeatTotals record={record} show = {show}/> :
                                <Loading />
                        }
                    </div>
                    <div className={classes.invoices}>
                        {
                            record && show ? <TotalShow record={record} seatsPrice={seatsPrice}/> :
                                <Loading />
                        }
                    </div>
                </CardContent>
                <CardActions>
                    <ReactToPrint
                        content={reactToPrintContent}
                        documentTitle="AwesomeFileName"
                        onAfterPrint={handleAfterPrint}
                        onBeforeGetContent={handleOnBeforeGetContent}
                        onBeforePrint={handleBeforePrint}
                        removeAfterPrint
                        trigger={reactToPrintTrigger}
                    />
                </CardActions>
            </Card>
            {/*<Card className={classes.root}>*/}
            {/*    <CardContent>*/}
            {/*        <Grid container spacing={2}>*/}
            {/*            <Grid item xs={6}>*/}
            {/*                <Typography variant="h6" gutterBottom>*/}
            {/*                    Tom Ticket*/}
            {/*                </Typography>*/}
            {/*            </Grid>*/}
            {/*            <Grid item xs={6}>*/}
            {/*                <Typography variant="h6" gutterBottom align="right">*/}
            {/*                    Order {record.id}*/}
            {/*                </Typography>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*        <Grid container spacing={2}>*/}
            {/*            <Grid item xs={12} container alignContent="flex-end">*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*        <div className={classes.spacer}>&nbsp;</div>*/}
            {/*        <Grid container spacing={2}>*/}
            {/*            <Grid item xs={6}>*/}
            {/*                <Typography variant="h6" gutterBottom align="center">*/}
            {/*                    Date{' '}*/}
            {/*                </Typography>*/}
            {/*                <Typography gutterBottom align="center">*/}
            {/*                    {new Date(record.createdDate).toLocaleDateString()}*/}
            {/*                </Typography>*/}
            {/*            </Grid>*/}

            {/*            <Grid item xs={5}>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*        <div className={classes.invoices}>*/}
            {/*            <Basket record={record} />*/}
            {/*        </div>*/}

            {/*        <div className={classes.invoices}>*/}
            {/*            {*/}
            {/*                record && show ? <SeatTotals record={record} show = {show}/> :*/}
            {/*                    <Loading />*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </div>
    );
};

export default TicketShow;

const useStyles = makeStyles({
    root: { width: 600, margin: 'auto' ,
    // backgroundImage: `url(${image})`
        backgroundImage: `url("https://i.pinimg.com/736x/01/93/93/019393252b2d4d707e6b05db15e9a9a5--cinema-ticket-card-ui.jpg")`
    },
    spacer: { height: 20 },
    invoices: { margin: '10px 0' },
});
