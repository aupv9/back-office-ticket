import * as React from 'react';
import { Box } from '@material-ui/core';

const getColorFromStatus = (status) =>
    status ? '#7dbde8' :'#e8cb7d'




export const Status = ({ status }) => (
    <Box
        width={10}
        height={10}
        display="inline-block"
        borderRadius={5}
        bgcolor={getColorFromStatus(status)}
        component="span"
    />
);
