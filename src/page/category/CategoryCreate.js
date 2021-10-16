import * as React from 'react';

import {
    Create,
    FormTab,
    ReferenceInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    RichText, NumberInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import {makeStyles} from "@material-ui/core/styles";
import {InputAdornment} from "@material-ui/core";

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

const types = [
    { value: 'Combos', name: 'Combos' },
    { value: 'Foods', name: 'Foods' },
    { value: 'Drinks', name: 'Drinks'},
    { value: 'Others', name: 'Others'}
];

export const CategoryCreate = (props) =>{
    const classes = useStyles();
    return(
        <Create {...props}>
            <TabbedForm >
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
                    <SelectInput source="type" formClassName={classes.name} choices={types} optionText="name" optionValue="value" validate={requiredValidate}/>

                    {/*<NumberInput*/}
                    {/*    source="price"*/}
                    {/*    validate={required()}*/}
                    {/*    className={classes.price}*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="start">*/}
                    {/*                vnd*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*/>*/}

                </FormTab>
                <FormTab
                    label="description"
                    path="description"
                    contentClassName={classes.tab}
                >
                    <RichTextInput source="description" />
                </FormTab>

            </TabbedForm>
        </Create>
    )
}

const requiredValidate = [required()];
