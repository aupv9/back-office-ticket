import * as React from 'react';
import {
    EditButton,
    ShowButton, useRedirect,
} from 'react-admin';
import {Box, Button} from '@material-ui/core';
import {Link as RouterLink} from "react-router-dom";
import {Money, TheatersSharp} from "@material-ui/icons";



export const MyOrderAside = ({record,amount}) =>{
    const redirect = useRedirect();
    console.log(record)
    return(
        <Box ml={4} width={250} minWidth={250}>
            <Box textAlign="center" mb={2}>
                <Button
                    component={RouterLink}
                    to={{
                        pathname: '/payments/create',
                        state: { record: { partId: record.id ,amount:amount,userId:record.userId,expire:record["expirePayment"]} },
                    }}
                    color="primary"
                    variant="contained"
                    size="small"
                    startIcon={<Money />}
                >
                    Make Payment
                </Button>
            </Box>
        </Box>
    )
}
