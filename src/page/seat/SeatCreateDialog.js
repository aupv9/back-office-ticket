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
export const SeatCreateDialog = ({ open} ) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();
    const roomId = localStorage.getItem("idRoom") ? parseInt(localStorage.getItem("idRoom")) : 0;
    const { data, loading, error } = useGetOne('rooms',roomId );
    if(error) {
        return <Error error={"Not Found"}/>;
    };
    const rooms  = [
        {id:data.id,name:data.name}
    ];
    const handleClose = () => {
        redirect('list', '/seats');
    };

    return (
            <Create
                resource="seats"
                basePath="/seats"
                className={classes.root}
                onSuccess={handleClose}
            >
                <SimpleForm initialValues={{ index: 0 }} >
                    <Typography variant="h6" gutterBottom classes={classes.title}>
                        {"Seat"}
                    </Typography>
                    <NumberInput
                        source="numbers"
                        validate={requiredValidate}
                        validate={requiredValidate}
                    />

                    <SelectInput source="tier" formClassName={classes.name} choices={tiers} optionText={"name"} optionValue="value" validate={requiredValidate}/>

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
                    <ReferenceInput source="roomId" reference="rooms" >
                        <AutocompleteInput
                            optionText={(choice) =>
                                choice.id
                                    ? `${choice.name}`
                                    : ''
                            }
                        />
                    </ReferenceInput>
                </SimpleForm>
            </Create>
    );
};

const requiredValidate = [required()];
