import {
    Edit,
    SimpleForm,
    TextInput,
    Create,
    NumberInput,
    required,
    useTranslate,
    SelectInput,
    useRecordContext, ReferenceInput, useGetOne, useNotify
} from "react-admin";
import * as React from "react";
import {InputAdornment, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";



export const styles = {
    name: { display: 'block' },
    zipcode: { display: 'block' },
    title:{
        fontWeight:'bold'
    }
};

const useStyles = makeStyles(styles);

const tiers = [
    { value:'A',name: 'A' }, { value:'B',name: 'B' }, { value:'C',name: 'C' },{value:'D', name: 'D' },
    { value:'E',name: 'E' },{ value:'F',name: 'F' },{ value:'G',name: 'G' }, { value:'H', name: 'H' },
];

const types = [
    { value: 'Standard', name: 'Standard' },
    { value: 'Vip', name: 'Vip' },
    { value: 'Super Vip', name: 'Super Vip'}
];
const FullNameField = ({ record }) => <span>{record.name}</span>


export const SeatCreate = props => {
    const classes = useStyles(props);
    const history = useHistory();
    const notify = useNotify();
    // const goBack = () =>{
    //     notify("Create Success",'success');
    //     setTimeout(()=>{
    //         history.goBack();
    //     },1500)
    //
    // }
    return (
        <Create {...props} onSuccess={goBack}>
            <SimpleForm>
                <Typography variant="h6" gutterBottom classes={classes.title}>
                    {"Seat"}
                </Typography>
                <NumberInput
                    source="numbers"
                    validate={requiredValidate}
                />

                <SelectInput source="tier" formClassName={classes.name} choices={tiers} optionText={"name"} optionValue="value" />

                <SelectInput source="type" formClassName={classes.name} choices={types} optionText="name" optionValue="value" />

                <NumberInput
                    source="price"
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
                <ReferenceInput
                    source="roomId"
                    reference="rooms"
                    validate={requiredValidate}
                >
                    <SelectInput source="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );

};



const requiredValidate = [required()];
