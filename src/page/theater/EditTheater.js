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
    ShowButton, CreateButton, ArrayInput, SimpleFormIterator,DateInput
} from 'react-admin';
import {Button, InputAdornment} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import ImageTheater from "./Image";
import { GMapInput, GMapField } from '@fusionworks/ra-google-maps-input';
import Aside from "../room/Aside";
import MobileGrid from "../room/MobileGrid";
import TheaterNameField from "../room/TheaterNameField";
import {Route} from "react-router-dom";
import {RoomCreateDialog} from "../room/RoomCreateDialog";


const ProductTitle = ({ record }) =>
    record ? <span>Theater #{record.name}</span> : null;

const useStyles = makeStyles({
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
});

const EditTheater = (props) =>{
    const classes = useStyles();

    return(
        <Edit {...props} title={<ProductTitle />}>
            <TabbedForm>
                <FormTab
                    label="image"
                    contentClassName={classes.tab}
                >
                    <ImageTheater />
                    <TextInput
                        source="image"
                        fullWidth
                        validate={requiredValidate}
                    />
                    <TextInput
                        source="thumbnail"
                        fullWidth
                        validate={requiredValidate}
                    />
                </FormTab>
                <FormTab
                    label="detail"
                    path="detail"
                    contentClassName={classes.tab}
                >
                    <TextInput source="name" validate={requiredValidate} />
                    <TextInput source="code" validate={requiredValidate} />
                    <ReferenceInput
                        source="locationId"
                        reference="locations"
                        validate={requiredValidate}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <TextInput source="address" validate={requiredValidate} />
                    {/*<GMapField*/}
                    {/*    source=""*/}
                    {/*    googleKey=""*/}
                    {/*    searchable={true}*/}
                    {/*/>*/}

                    {/*<GMapInput*/}
                    {/*    source="longitude"*/}
                    {/*    multipleMarkers*/}
                    {/*    googleKey="<YOUR_GOOGLE_APP_KEY>"*/}
                    {/*/>*/}
                </FormTab>
                <FormTab label="rooms" path="rooms">

                    <CreateButton label={"New Room"} variant="contained" basePath={"/rooms"} title={"New Room"} />
                    <Route path="/rooms/create">
                        {({ match }) => <RoomCreateDialog open={!!match} />}
                    </Route>
                    <ReferenceManyField
                        reference="rooms"
                        target="theater_id"
                        addLabel={false}
                        pagination={<Pagination />}
                        fullWidth
                        perPage={20}
                    >
                        {/*<List*/}
                        {/*    {...props}*/}
                        {/*    sort={{ field: 'id', order: 'ACS' }}*/}
                        {/*    perPage={25}*/}
                        {/*    // actions={<ListActions/>}*/}
                        {/*>*/}
                            <Datagrid optimized>
                                <TextField
                                    source="name"
                                />
                                <TextField
                                    source="code"
                                />
                                <TextField source="type" />
                                <EditButton />
                            </Datagrid>
                        {/*</List>*/}

                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </Edit>
    )
};
const requiredValidate = [required()];

export default EditTheater;

