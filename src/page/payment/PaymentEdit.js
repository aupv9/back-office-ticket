import * as React from 'react';
import {
    Edit,
    required,
    TextInput,
    SelectArrayInput,
    SimpleForm,
    ReferenceArrayInput, AutocompleteInput, ReferenceInput, SelectInput, NumberInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {InputAdornment} from "@material-ui/core";


const RoomTitle = ({ record }) => record ? <span>Room #{record.name}</span> : null;


const useStyles = makeStyles({
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
    btnCreate:{
        margin:'50px'
    }
});


const PaymentEdit = (props) =>{
    const classes = useStyles();
    const {actions,filters} = props;


    return(
        <Edit {...props} title={<RoomTitle />}>
            <SimpleForm >
                <ReferenceInput reference={"payments-method"} source={"paymentMethodId"}>
                    <SelectInput source={"name"} />
                </ReferenceInput>
                <NumberInput
                    source="amount"
                    className={classes.price}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                vnd
                            </InputAdornment>
                        ),
                    }}
                    validate={requiredValidate}
                />
                <SelectInput source="status" choices={[
                    { id: 'Verified', name: 'Verified' },
                    { id: 'Pending', name: 'Pending' },
                    { id: 'Complete', name: 'Complete' },
                ]} />
            </SimpleForm>
        </Edit>
    )
};


const requiredValidate = [required()];
export default PaymentEdit;
