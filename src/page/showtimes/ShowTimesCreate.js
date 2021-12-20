import {
    AutocompleteInput,
    Create,
    FormTab,
    ReferenceInput,
    required,
    TabbedForm, DateInput, NumberInput
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useState} from "react";

import { DateKeyInput} from '../../datepicker/Picker';
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
    root:{
        width:1000
    }
});


export const ShowTimesCreate = (props) =>{
    const classes = useStyles();

    return(
        <Create {...props}
                className={classes.root}
        >
            <TabbedForm >
                <FormTab
                    label="summary"
                    contentClassName={classes.tab}
                >
                    <ReferenceInput reference="movies" source="movieId" isRequired={true} >
                        <AutocompleteInput
                                optionText={(choice) =>
                                    choice.id ? `${choice.name}` : ''
                                }
                        />
                    </ReferenceInput>

                    <ReferenceInput reference="rooms" source="roomId" >
                        <AutocompleteInput
                            optionText={(choice) =>
                                choice.id ? `${choice.name}` : ''
                            }
                        />
                    </ReferenceInput>

                    <DateKeyInput source="timeStart" label="Time Start"  />
                    <DateKeyInput source="timeEnd" label="Time End"  />

                    <NumberInput
                        source="price"
                        className={classes.price}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    vnd
                                </InputAdornment>
                            ),
                        }}
                        validate={requiredValidate}
                    />
                </FormTab>

                <FormTab
                    label="promotion"
                    path="promotion"
                    contentClassName={classes.tab}
                >

                </FormTab>
            </TabbedForm>
        </Create>
    )
};
const requiredValidate = required();
