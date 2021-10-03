import {
    TabbedForm, AutocompleteInput, Edit, Datagrid,
    ReferenceManyField, TextInput, EditButton, FormTab, required,
    Pagination
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";


const LocationTitle = ({ record }) => {
    return <span>Location {record ? `"${record.name}"` : ''}</span>;
};

const useStyles = makeStyles({
    price: { width: '7em' },
    width: { width: '7em' },
    height: { width: '7em' },
    stock: { width: '7em' },
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


export const LocationEdit = props => {

    const classes = useStyles();

    return (
        <Edit {...props} title={<LocationTitle />}>
            <TabbedForm>
                <FormTab
                    label="Location description"
                    contentClassName={classes.tab}
                >
                    {/*<Poster />*/}
                    <TextInput
                        source="name"
                        fullWidth
                        validate={requiredValidate}
                    />
                    <TextInput
                        source="zipcode"
                        fullWidth
                        validate={requiredValidate}
                    />
                </FormTab>
                {/*<FormTab label="resources.products.tabs.reviews" path="reviews">*/}
                {/*    <ReferenceManyField*/}
                {/*        reference="reviews"*/}
                {/*        target="product_id"*/}
                {/*        addLabel={false}*/}
                {/*        pagination={<Pagination />}*/}
                {/*        fullWidth*/}
                {/*    >*/}
                {/*    </ReferenceManyField>*/}
                {/*</FormTab>*/}
            </TabbedForm>
        </Edit>
    );
}


const requiredValidate = [required()];

