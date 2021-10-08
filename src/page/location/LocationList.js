import * as React from 'react';
import {
    List as RAList,
    ListProps,
    SimpleListLoading,
    ReferenceField,
    TextField,
    useListContext,
    ExportButton,
    SortButton,
    TopToolbar,
    CreateButton,
    Pagination,
    useGetIdentity, EditButton, Datagrid,
} from 'react-admin';
import {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Typography, List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import {LocationFilter} from "./LocationFilter";
import {GridList} from "./GridList";

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
    return  (
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
