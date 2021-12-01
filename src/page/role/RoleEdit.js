import * as React from 'react';
import {
    Edit,
    required,
    TextInput,
    SelectArrayInput,
    SimpleForm,
    ReferenceArrayInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {PrivilegeReferenceInput} from "./PrivilegeReferenceInput";


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


const RoleEdit = (props) =>{
    const classes = useStyles();
    const {actions,filters} = props;


    return(
        <Edit {...props} title={<RoomTitle />}>
            <SimpleForm >
                <TextInput source={"name"} />
                <TextInput source={"code"} />

                <PrivilegeReferenceInput
                    source="privileges"
                    reference="privileges"
                    allowEmpty
                    // validate={required()}
                    perPage={10000}
                    sort={{field:"name",order:"ASC"}}

                />
            </SimpleForm>
        </Edit>
    )
};


const requiredValidate = [required()];
export default RoleEdit;
