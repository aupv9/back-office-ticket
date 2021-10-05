import * as React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    EditProps,
    FormTab,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import ImageTheater from "./Image";
import { GMapInput, GMapField } from '@fusionworks/ra-google-maps-input';


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
                    <ReferenceManyField
                        reference="rooms"
                        target="theater_id"
                        addLabel={false}
                        pagination={<Pagination />}
                        fullWidth
                    >
                        <Datagrid>
                            <TextField
                                source="name"
                            />
                            <TextField
                                source="code"
                            />
                            <TextField source="type" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </Edit>
    )
};
const requiredValidate = [required()];

export default EditTheater;

