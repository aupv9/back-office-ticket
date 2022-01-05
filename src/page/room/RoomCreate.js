import * as React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    FormTab,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    TabbedForm,
    TextField,TextInput, Create,SimpleForm,ReferenceArrayInput,SelectArrayInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';


const RoomTitle = ({ record }) => record ? <span>Room #{record.name}</span> : null;


const useStyles = makeStyles({
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
    page:{
        maxWidth:500
    }
});


const RoomCreate= (props) =>{
    const classes = useStyles();
    const choices = [
        { value: 'Standard', name: 'Standard' },
        { value: 'Vip', name: 'Vip' },
        { value: 'Super Vip', name: 'Super Vip'}
    ];
    return(
        <Create {...props} title={<RoomTitle />} classes={classes.page}>
            <SimpleForm >
                    <TextInput source="name" validate={requiredValidate} />

                    <TextInput source="code" validate={requiredValidate} />
                    {/*<ReferenceInput*/}
                    {/*    source="theaterId"*/}
                    {/*    reference="theaters"*/}
                    {/*    validate={requiredValidate}*/}
                    {/*>*/}
                    {/*    <SelectInput source="name" />*/}
                    {/*</ReferenceInput>*/}

                <ReferenceArrayInput source="services" reference="services">
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>

            </SimpleForm>
        </Create>
    )
};
const requiredValidate = [required()];

export default RoomCreate;
