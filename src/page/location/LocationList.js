import * as React from 'react';
import {
    List as RAList,
    ExportButton,
    TopToolbar,
    CreateButton,
    Pagination, usePermissions,
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import {LocationFilter} from "./LocationFilter";
import {GridList} from "./GridList";
import {useEffect, useState} from "react";
import * as _ from "lodash";

const useActionStyles = makeStyles(theme => ({
    createButton: {
        marginLeft: theme.spacing(2),
    },
}));


const LocationListActions = () => {
    const classes = useActionStyles();
    return (
        <TopToolbar>
            <ExportButton />
            <CreateButton
                basePath="/locations"
                variant="contained"
                label="New Location"
                className={classes.createButton}
            />
        </TopToolbar>
    );
};




export const LocationList = (props) =>{
    const { loaded, permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const isHavePermission = (permission) =>{
        console.log(arrPermission)
        return _.includes(arrPermission,permission);
    }
    useEffect(() =>{
        setArrPermission(permissions);
    },[permissions]);

    return isHavePermission("READ_LOCATION") && (
        <RAList {...props}
              actions={<LocationListActions/>}
              aside={<LocationFilter />}
              perPage={25}
              pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
              sort={{ field: 'id', order: 'ASC' }}
              component={"div"}
        >
            <GridList />
        </RAList>
    )
}
