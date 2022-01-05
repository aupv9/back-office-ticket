import * as React from 'react';
import {
    Datagrid,
    Edit,
    FormTab,
    Pagination,
    ReferenceManyField,
    required,
    TabbedForm,
    TextField,
    TextInput,
    SelectArrayInput, ReferenceArrayInput
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


const RoomEdit = (props) =>{
    const classes = useStyles();


    return(

        <>
            <Edit {...props} title={<RoomTitle />}>
                <TabbedForm>

                    <FormTab
                        label="detail"
                        contentClassName={classes.tab}
                    >
                        <TextInput source="name" validate={requiredValidate} />
                        <TextInput source="code" validate={requiredValidate} />
                        <ReferenceArrayInput source="services" reference="services">
                            <SelectArrayInput optionText="name" />
                        </ReferenceArrayInput>
                        {/*<ReferenceInput*/}
                        {/*    source="theaterId"*/}
                        {/*    reference="theaters"*/}
                        {/*    validate={requiredValidate}*/}
                        {/*>*/}
                        {/*    <SelectInput source="name" />*/}
                        {/*</ReferenceInput>*/}

                        {/*<SelectInput source="type" choices={choices} optionText="name" optionValue="value" />*/}

                        {/*<SelectInput source="type" choices={[*/}
                        {/*    {value:'Standard'} ,*/}
                        {/*    {value:'Vip'},*/}
                        {/*    {value:'Super Vip'}*/}
                        {/*]} validate={requiredValidate} defaultValue={'Standard'} optionValue={"value"}/>*/}
                    </FormTab>
                    <FormTab label="seats" path="seats">
                        {/*<CreateButton label={"New Seat For Rom"} variant="contained" basePath={`/seats`} onClick={setIdUseRedirect}*/}
                        {/*              classes={classes.btnCreate}/>*/}
                        <ReferenceManyField
                            reference="seats"
                            target="room_id"
                            addLabel={false}
                            pagination={<Pagination />}
                            fullWidth
                        >
                            <Datagrid optimized >
                                <TextField source="tier" />
                                <TextField source="numbers" />
                                <TextField
                                    source="seatType"
                                />
                                {/*<EditButton  onClick={setIdUseRedirect}/>*/}
                            </Datagrid>
                        </ReferenceManyField>

                    </FormTab>
                </TabbedForm>

            </Edit>
        </>

    )
};
















const requiredValidate = [required()];
export default RoomEdit;
