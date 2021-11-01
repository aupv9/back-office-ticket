import * as React from 'react';

import {
    Create,
    FormTab, NumberInput,
    ReferenceInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
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

export const ConcessionCreate = (props) =>{
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
                    <ReferenceInput
                        source="categoryId"
                        reference="categories"
                        validate={requiredValidate}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>

                    <NumberInput
                        source="price"
                        validate={required()}
                        className={classes.price}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    vnd
                                </InputAdornment>
                            )
                        }}
                    />

                </FormTab>

            </TabbedForm>
        </Create>
    )
}

const requiredValidate = [required()];
