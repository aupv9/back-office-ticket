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
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import ImageTheater from "./Image";
import { GMapInput, GMapField } from '@fusionworks/ra-google-maps-input';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {useState} from "react";

const ProductTitle = ({ record }) =>
    record ? <span>Theater #{record.name}</span> : null

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
// const dateFormatter = v => {
//     // v is a `Date` object
//     if (!(v instanceof Date) || isNaN(v)) return;
//     const pad = '00';
//     const yy = v.getFullYear().toString();
//     const mm = (v.getMonth() + 1).toString();
//     const dd = v.getDate().toString();
//     const hh = v.getHours().toString();
//     return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
// };
//
// const dateParser = v => {
//     // v is a string of "YYYY-MM-DD" format
//     const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
//     if (match === null) return;
//     const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
//     if (isNaN(d)) return;
//     return d;
// };
const EditTheater = (props) =>{
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());

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
                        perPage={20}
                    >
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

                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </Edit>
    )
};
const requiredValidate = [required()];

export default EditTheater;

