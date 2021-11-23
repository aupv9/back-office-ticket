import {
    Create,
    FormTab,
    required,
    TabbedForm,
    useRedirect,
    TextInput,
    NumberInput,
    SelectInput,AutocompleteArrayInput,ReferenceArrayInput,BooleanInput
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useEffect, useState} from "react";
import { DateKeyInput} from '../../datepicker/Picker';
import {Box, InputAdornment, Typography} from "@material-ui/core";
import RichTextInput from "ra-input-rich-text";
import {useTimer} from "react-timer-hook";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {useHistory} from "react-router-dom";
import { sub,subMinutes } from 'date-fns'
import {value} from "lodash/seq";

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

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        return <div className="timer">Too lale...</div>;
    }

    return (
        <div className="timer">
            <div className="text">Expire remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
        </div>
    );
};

export const OfferCreate = (props) =>{
    const [duration,setDuration] = useState(0);

    const redirect = useRedirect();
    const history = useHistory();

    const [type,setType] = useState("");
    const [method,setMethod] = useState("");

    const classes = useStyles();
    const changeType = ({target}) =>{
        console.log(target)
        setType(target.value);
    }
    const changeMethod =({target}) =>{
        setMethod(target.value);
    }
    return(
        <Create {...props} >
            <TabbedForm>
                <FormTab
                    label="summary"
                    contentClassName={classes.tab}
                >
                    <TextInput source={"name"} required={requiredValidate}/>
                    {/*<RichTextInput source={"note"}/>*/}
                    <SelectInput source={"type"} choices={[
                                                            { id: 'Flat', name: 'Flat' },
                                                            { id: 'Percentage', name: 'Percentage' }]}
                                 onChange={changeType}
                    />
                    <SelectInput source={"method"} choices={[
                                                            { id: 'Voucher', name: 'Voucher' },
                                                            { id: 'Coupon', name: 'Coupon' }]}
                                 onChange={changeMethod}
                    />
                    <DateKeyInput source={"startDate"}/>
                    <DateKeyInput source={"endDate"}/>
                    {
                        type === "Flat" ?
                            <>
                                <NumberInput
                                    label={"Discount Amount"}
                                    source="discountAmount"
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
                            </>
                           :
                            <Box>
                                <NumberInput
                                    label={"Discount Percentage"}
                                    source="percentage"
                                    className={classes.price}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                %
                                            </InputAdornment>
                                        ),
                                    }}
                                    validate={requiredValidate}
                                />
                                <NumberInput
                                    label={"Maximum Discount"}
                                    source="maxDiscount"
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
                            </Box>

                    }
                    <TextInput source="rule" multiline fullWidth/>
                    <NumberInput
                        label={"Maximum total usage"}
                        source="maxTotalUsage"
                        className={classes.price}
                        validate={requiredValidate}
                    />

                    <BooleanInput label="Profile" source="anonProfile" />
                </FormTab>
                <FormTab
                    label="detail"
                    path={"detail"}
                    contentClassName={classes.tab}
                >
                    {
                        method === "Coupon" ?
                            <Coupon />

                          : <Voucher />
                    }
                </FormTab>
                <FormTab
                    label="selection movie"
                    path={"selection"}
                    contentClassName={classes.tab}
                >
                    <ReferenceArrayInput label="Movies" reference="movies" source="movieIds">
                        <AutocompleteArrayInput />
                    </ReferenceArrayInput>
                </FormTab>
            </TabbedForm>
        </Create>
    )
};

const Coupon = () =>{


    return (
        <Box>
            <Box>
                <TextInput source="code"/>
            </Box>
            <Box>
                <TextInput source="message" multiline />
            </Box>
            <Box>
                <NumberInput
                    label={"Max usage per user"}
                    source="maxUsagePerUser"
                    validate={requiredValidate}
                />
            </Box>

        </Box>
    )
}

const Voucher = () =>{


    return (
        <Box>
            <NumberInput
                label={"Quantity Voucher Code"}
                source="countCode"
                validate={requiredValidate}
            />
            <TextInput source="message" multiline fullWidth/>
        </Box>
    )
}

const requiredValidate = required();

