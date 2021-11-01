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

const tiers = [
    { value:'A',name: 'A' }, { value:'B',name: 'B' }, { value:'C',name: 'C' },{value:'D', name: 'D' },
    { value:'E',name: 'E' },{ value:'F',name: 'F' },{ value:'G',name: 'G' }, { value:'H', name: 'H' },
];

const types = [
    { value: 'Standard', name: 'Standard' },
    { value: 'Vip', name: 'Vip' },
    { value: 'Super Vip', name: 'Super Vip'}
];
export const ConcessionDialog = ({ open} ) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();

    const handleClose = () => {
        redirect('edit', '/rooms', parseInt(localStorage.getItem("idRoom")));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Create
                resource="seats"
                basePath="/seats"
                className={classes.root}
                onSuccess={handleClose}
            >
                <SimpleForm initialValues={{ index: 0 }} >
                    {/*<Typography variant="h6" gutterBottom classes={classes.title}>*/}
                    {/*    {"Seat"}*/}
                    {/*</Typography>*/}
                    {/*<NumberInput*/}
                    {/*    source="numbers"*/}
                    {/*    validate={requiredValidate}*/}
                    {/*    validate={requiredValidate}*/}
                    {/*/>*/}

                    {/*<SelectInput source="tier" formClassName={classes.name} choices={tiers} optionText={"name"} optionValue="value" validate={requiredValidate}/>*/}

                    {/*<SelectInput source="seatType" formClassName={classes.name} choices={types} optionText="name" optionValue="value" validate={requiredValidate}/>*/}

                    {/*<NumberInput*/}
                    {/*    source="price"*/}
                    {/*    className={classes.price}*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="start">*/}
                    {/*                vnd*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*    validate={requiredValidate}*/}
                    {/*/>*/}
                </SimpleForm>
            </Create>
        </Dialog>
    );
};

const requiredValidate = [required()];
