import {
    AutocompleteInput,
    Create,
    FormTab,
    ReferenceInput,
    required,
    TabbedForm, useRedirect, useRefresh, TextInput, NumberInput, ReferenceField, TextField, DateField,SelectInput
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useState} from "react";
import { DateKeyInput} from '../../datepicker/Picker';
import {InputAdornment} from "@material-ui/core";
import RichTextInput from "ra-input-rich-text";

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


export const PaymentCreate = (props) =>{
    console.log(props.location.state.record)
    const classes = useStyles();
    const [theater,setTheater] = useState();

    return(
        <Create {...props} >
            <TabbedForm>
                <FormTab
                    label="Summary"
                    contentClassName={classes.tab}
                >
                    {/*<TextInput source={"partId"}/>*/}

                    <ReferenceField source={"partId"} reference={"orders"} label={"Movie"} link={false}>
                        <ReferenceField reference={"showTimesDetails"} source={"showTimesDetailId"} link={false}>
                            <ReferenceField reference={"movies"} source={"movieId"} link={false}>
                                <TextField source={"name"}/>
                            </ReferenceField>
                        </ReferenceField>
                    </ReferenceField>

                    <ReferenceField source={"partId"} reference={"orders"} label={"Movie"} link={false}>
                        <ReferenceField reference={"showTimesDetails"} source={"showTimesDetailId"} link={false}>
                            <ReferenceField reference={"rooms"} source={"roomId"} link={false}>
                                <TextField source={"name"}/>
                            </ReferenceField>
                        </ReferenceField>
                    </ReferenceField>
                    <ReferenceField source={"partId"} reference={"orders"} label={"Movie"} link={false}>
                        <ReferenceField reference={"showTimesDetails"} source={"showTimesDetailId"} link={false}>
                            <DateField source="timeStart"  locales="VN" showTime options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric',hour:'numeric',minute:'numeric'}}
                                       label={"Day Show Times"}/>
                        </ReferenceField>
                    </ReferenceField>

                </FormTab>
                <FormTab
                    label="Make Payment"
                    contentClassName={classes.tab}
                >
                    <DateField source="expire"  locales="VN" showTime options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric',hour:'numeric',minute:'numeric'}}
                               label={"Expire Time Payment"}/>
                    <ReferenceInput reference={"payments-method"} source={"paymentMethodId"}>
                        <SelectInput source={"name"} />
                    </ReferenceInput>
                    <NumberInput
                        source="amount"
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
                    label="Note"
                    contentClassName={classes.tab}
                >
                  <RichTextInput source={"note"}/>
                </FormTab>
            </TabbedForm>
        </Create>
    )
};
const requiredValidate = required();
