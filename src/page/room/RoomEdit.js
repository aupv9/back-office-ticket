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
    TextField,
    TextInput,
    CreateButton,
    useRedirect,
    BulkDeleteButton,
    BulkExportButton,
    TopToolbar, FilterButton, ExportButton, SearchInput, AutocompleteInput, useGetList, BooleanInput, ListToolbar
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import ColoredNumberField from "./ColoredNumberField";
import {match, Route} from "react-router-dom";
import {RoomCreateDialog} from "../seat/SeatCreateDialog";
import {Button} from "@material-ui/core";
import IconEvent from '@material-ui/icons/Event';
import {Fragment, useEffect} from "react";
import MobileGrid from "./MobileGrid";
import TheaterNameField from "./TheaterNameField";

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

const PostBulkActionButtons = ({ basePath }) => (
    <Fragment>
        <BulkExportButton />
        <BulkDeleteButton basePath={basePath} />
    </Fragment>
);

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const roomFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="theater_id" reference="theaters">
        <AutocompleteInput
            optionText={(choice) =>
                choice.id // the empty choice is { id: '' }
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,

];

const RoomEdit = (props) =>{
    const classes = useStyles();
    const {actions,filters} = props;
    const redirect = useRedirect();
    const choices = [
        { value: 'Standard', name: 'Standard' },
        { value: 'Vip', name: 'Vip' },
        { value: 'Super Vip', name: 'Super Vip'}
    ];

    const setIdUseRedirect = () =>{
        localStorage.setItem("idRoom",props.id);
    };

    const { data, ids, loading, error } = useGetList(
        'seats',
        { page: 1, perPage: 10 },
        { field: 'id', order: 'ASC' }
    );

    useEffect(() =>{


    },[ids,data]);

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
                        <ReferenceInput
                            source="theaterId"
                            reference="theaters"
                            validate={requiredValidate}
                        >
                            <SelectInput source="name" />
                        </ReferenceInput>

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
