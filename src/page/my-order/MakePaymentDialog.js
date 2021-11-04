import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    required,
    useRedirect,
    useDataProvider, useGetOne,
    TextField,
    Error
} from 'react-admin';
import {Dialog, InputAdornment, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {useEffect} from "react";



const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

// const tiers = [
//     { value:'A',name: 'A' }, { value:'B',name: 'B' }, { value:'C',name: 'C' },{value:'D', name: 'D' },
//     { value:'E',name: 'E' },{ value:'F',name: 'F' },{ value:'G',name: 'G' }, { value:'H', name: 'H' },
// ];
//
// const types = [
//     { value: 'Standard', name: 'Standard' },
//     { value: 'Vip', name: 'Vip' },
//     { value: 'Super Vip', name: 'Super Vip'}
// ];
export const MakePaymentDialog = ({ open} ) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();

    // const handleClose = () => {
    //     redirect('edit', '/rooms', parseInt(localStorage.getItem("idRoom")));
    // };

    return (
        <Dialog open={open} >
            <Create
                resource="seats"
                basePath="/seats"
                className={classes.root}
                // onSuccess={handleClose}
            >
                <SimpleForm initialValues={{ index: 0 }} >

                </SimpleForm>
            </Create>
        </Dialog>
    );
};

const requiredValidate = [required()];
