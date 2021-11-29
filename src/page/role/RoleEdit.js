import * as React from 'react';
import {
    Edit,
    ReferenceInput,
    required,
    TextInput,
    CreateButton,
    useRedirect,
    BulkDeleteButton,
    BulkExportButton,
    TopToolbar,
    FilterButton,
    ExportButton,
    SearchInput,
    AutocompleteInput,
    SelectArrayInput,
    SimpleForm,
    ReferenceArrayInput,
    AutocompleteArrayInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import {Fragment, useEffect} from "react";


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
            <SimpleForm>
                <TextInput source={"name"} />
                <TextInput source={"code"} />

                <ReferenceArrayInput source="privileges" reference="privileges" >
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>

            </SimpleForm>
        </Edit>
    )
};


const requiredValidate = [required()];
export default RoleEdit;
