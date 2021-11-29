import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    required,
    useRedirect,
    useDataProvider, useGetOne,
    TextField, useNotify, useRefresh
} from 'react-admin';
import {Dialog, InputAdornment, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
export const SeatEdit = (props) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const notify = useNotify();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify(`Changes saved`)
        redirect(`/rooms/${parseInt(localStorage.getItem("idRoom"))}`)
        refresh();
    };
     // const redirect = () => `/rooms/${parseInt(localStorage.getItem("idRoom"))}/seats`;
    return (
            <Edit
                resource="seats"
                basePath="/seats"
                className={classes.root}
                {...props}
                 // onSuccess={onSuccess}
            >
                <SimpleForm initialValues={{ index: 0 }} >
                    <Typography variant="h6" gutterBottom classes={classes.title}>
                        {"Seat"}
                    </Typography>
                    <NumberInput
                        source="numbers"
                        validate={requiredValidate}
                    />

                    <ReferenceInput
                        source="roomId"
                        reference="rooms"
                        validate={requiredValidate}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>

                    <SelectInput source="seatType" formClassName={classes.name} choices={types} optionText="name" optionValue="value" validate={requiredValidate}/>

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
            </Edit>
    );
};

const requiredValidate = [required()];
