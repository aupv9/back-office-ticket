import * as React from 'react';
import {
    EditButton,
    ShowButton,
} from 'react-admin';
import { Box} from '@material-ui/core';



export const LocationAside = ({record,link}) =>{

    return(
        <Box ml={4} width={250} minWidth={250}>
            <Box textAlign="center" mb={2}>
                {link === 'edit' ? (
                    <EditButton
                        basePath="/locations"
                        record={record}
                        label="Edit Location"
                    />
                ) : (
                    <ShowButton
                        basePath="/locations"
                        record={record}
                        label="Show Location"
                    />
                )}
            </Box>
        </Box>
    )
}
