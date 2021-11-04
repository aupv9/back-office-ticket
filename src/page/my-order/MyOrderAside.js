import * as React from 'react';
import {
    EditButton,
    ShowButton,
} from 'react-admin';
import {Box, Button} from '@material-ui/core';
import {Link as RouterLink} from "react-router-dom";
import {Money, TheatersSharp} from "@material-ui/icons";



export const MyOrderAside = ({record}) =>{

    return(
        <Box ml={4} width={250} minWidth={250}>
            <Box textAlign="center" mb={2}>
                <Button
                    component={RouterLink}
                    to={{
                        pathname: '/my-orders/create',
                        // state: { record: { company_id: record.id } },
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
