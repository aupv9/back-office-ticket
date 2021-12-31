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
    useGetOne,ImageField
} from 'react-admin';
import {Box, Button, CardActions, CardHeader} from "@material-ui/core";
import SeatTotals from "./SeatTotal";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {useEffect, useRef, useState} from "react";
import {CodeRounded} from "@material-ui/icons";
import TotalShow from "../showtimes/TotalShow";
import image from '../../image/Movie Night Free Snack Facebook Post.png';
import {TicketTemplate} from "./TicketTemplate";


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
        );
    }, []);

    if (!record) return null;

    return (
        <div style={{display:"flex"}} >
            <Card className={classes.root} >
                <CardContent ref={componentRef}>
                    <TicketTemplate />
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
        </div>
    );
};

export default TicketShow;

const useStyles = makeStyles({
    root: { width: 600, margin: 'auto' ,
    // backgroundImage: `url(${image})`
        backgroundImage: `url(${image})`
    },
    spacer: { height: 20 },
    invoices: { margin: '10px 0' },
    image: {
        // margin: '0.5rem',
        maxHeight: '10rem',
        // width:"100%"
    },
});
