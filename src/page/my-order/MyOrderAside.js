import * as React from 'react';
import {
    CreateButton,
    EditButton,
    ShowButton, useEditContext, useRedirect,
} from 'react-admin';
import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';
import {Link as RouterLink} from "react-router-dom";
import {CodeRounded, Money, Queue, TheatersSharp} from "@material-ui/icons";

import {makeStyles} from "@material-ui/core/styles";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {useState} from "react";


export const MyOrderAside = ({amount,code,record}) => {
    const componentRef = React.useRef(null);

    const [isPrint,setIsPrint] = useState(false);

    const onBeforeGetContentResolve = React.useRef(null);

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
                Export Order
            </Button>
        ); // eslint-disable-line max-len
    }, []);
    return (
        <>
            {
                record && record.status === "non_payment"?
                    <Box ml={4} width={250} minWidth={250}>
                        <Box textAlign="center" mb={2}>
                            {
                                record ?  <Button
                                    component={RouterLink}
                                    to={{
                                        pathname: '/payments/create',
                                        state: { record: { code:code,partId: record.id ,amount:amount,userId:record.userId,expire:record["expirePayment"],createdDate:record["createdDate"]} },
                                    }}
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                    startIcon={<CodeRounded />}
                                >
                                    Make Payment
                                </Button> :null
                            }
                        </Box>
                    </Box> :null
                    // : record && record.status === "payment" ?
                    //     <Box ml={4} width={250} minWidth={250}>
                    //         <Box textAlign="center" mb={2}>
                    //             {
                    //                 record ?
                    //                     <ReactToPrint
                    //                         content={reactToPrintContent}
                    //                         documentTitle="AwesomeFileName"
                    //                         onAfterPrint={handleAfterPrint}
                    //                         onBeforeGetContent={handleOnBeforeGetContent}
                    //                         onBeforePrint={handleBeforePrint}
                    //                         removeAfterPrint
                    //                         trigger={reactToPrintTrigger}
                    //                     />
                    //
                    //                     :null
                    //             }
                    //         </Box>
                    //     </Box> : null
            }
            {
                isPrint && <TicketTemplate ref={componentRef}/>
            }

        </>
    )

}


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class TextComponent extends React.PureComponent {
    render() {
        return "This is bare text";
    }
}

 class TicketTemplate extends React.PureComponent {
    render() {
        return (
            <Box>
                <Card >
                    <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">

                        </Typography>
                        <Typography  color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>

                </Card>
            </Box>
            )

    }
}
