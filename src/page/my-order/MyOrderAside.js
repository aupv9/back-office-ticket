import * as React from 'react';
import {
    EditButton,
    ShowButton, useEditContext, useRedirect,
} from 'react-admin';
import {Box, Button} from '@material-ui/core';
import {Link as RouterLink} from "react-router-dom";
import {CodeRounded, Money, Queue, TheatersSharp} from "@material-ui/icons";
import {useState} from "react";



export const MyOrderAside = ({amount,code}) => {
    const {record,loaded} = useEditContext();
    // const [record2,setRecord2] = useState({});
    //
    // useState(() =>{
    //     if(loaded){
    //         const record = {
    //
    //         }
    //         setRecord2(record);
    //     }
    // },[record])
    return (
        <>
            {
                loaded && record.status === "non_payment"?
                    <Box ml={4} width={250} minWidth={250}>
                        <Box textAlign="center" mb={2}>
                        {
                            loaded ?  <Button
                                component={RouterLink}
                                to={{
                                    pathname: '/payments/create',
                                    state: { record: { code:code,partId: record.id ,amount:amount,userId:record.userId,
                                            expire:record["expirePayment"],createdDate:record["createdDate"]} },
                                }}
                                color="primary"
                                variant="contained"
                                size="small"
                                startIcon={<Money />}
                            >
                                Make Payment
                            </Button> :null
                        }
                        </Box>
                    </Box>
                    : loaded && record.status === "payment" ?
                        <Box ml={4} width={250} minWidth={250}>
                            <Box textAlign="center" mb={2}>
                                {
                                    loaded ?  <Button
                                        component={RouterLink}
                                        to={{
                                            pathname: '/payments/create',
                                            state: { record: { partId: record.id ,amount:amount,userId:record.userId,expire:record["expirePayment"],createdDate:record["createdDate"]} },
                                        }}
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        startIcon={<CodeRounded />}
                                    >
                                        Export Ticket
                                    </Button> :null
                                }
                            </Box>
                        </Box> : null
            }
        </>
    )

}
