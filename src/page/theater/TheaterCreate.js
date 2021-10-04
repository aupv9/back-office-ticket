import {makeStyles} from "@material-ui/core/styles";
import {
    Datagrid,
    Edit, EditButton,
    FormTab, NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField, required,
    SelectInput,
    TabbedForm, TextField,
    TextInput, Create
} from "react-admin";
import * as React from "react";
import ImageTheater from "./Image";
import {InputAdornment} from "@material-ui/core";


const TheaterTitle = ({ record }) =>
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

const TheaterCreate = (props) =>{
    const classes = useStyles();

    return(
        <Create {...props} >
            <TabbedForm>
                <FormTab
                    label="image"
                    contentClassName={classes.tab}
                >

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

            </TabbedForm>
        </Create>
    )
};
const requiredValidate = [required()];

export default TheaterCreate;

// <GMapField
//     source=""
//     googleKey=""
//     searchable={true}
// />
//
// <GMapInput
//     source="longitude"
//     multipleMarkers
//     googleKey="<YOUR_GOOGLE_APP_KEY>"
// />
