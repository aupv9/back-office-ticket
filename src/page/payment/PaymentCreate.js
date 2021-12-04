import {
    Create,
    FormTab,
    ReferenceInput,
    required,
    TabbedForm,
    useRedirect,
    NumberInput,
    ReferenceField,
    TextField,
    DateField,
    SelectInput, useCreateContext
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useEffect, useState} from "react";
import { DateKeyInput} from '../../datepicker/Picker';
import {Box, InputAdornment, Typography} from "@material-ui/core";
import RichTextInput from "ra-input-rich-text";
import {useTimer} from "react-timer-hook";
import TimerStyled from "./TimerStyled";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {useHistory} from "react-router-dom";
import { sub,subMinutes } from 'date-fns'
import {useRecordContext} from "ra-core";

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

export const PaymentCreate = (props) =>{
    const [duration,setDuration] = useState(0);
    // useEffect(() =>{
    //     if(props.location.state.record.expire){
    //         const duration = new Date(props.location.state.record.expire).getTime() - new Date().getTime();
    //         console.log(duration)
    //         setDuration(duration);
    //     }
    // },[]);
    console.log(props)
    const redirect = useRedirect();
    const history = useHistory();
    const  handleExpire = () =>{
        // redirect('list','payments');
        window.location.href = '#/shows';
    };

     const classes = useStyles();

    return(
        <Create {...props} >
            <TabbedForm >
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
                    path={"make-payment"}
                    contentClassName={classes.tab}
                >
                    <DateField source="expire"  locales="VN" showTime options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric',hour:'numeric',minute:'numeric',seconds:'numeric'}}
                               label={"Expire Time Payment"}/>
                    {/*<Box>*/}
                    {/*    <Typography>*/}

                    {/*    </Typography>*/}
                    {/*    <CountdownCircleTimer*/}
                    {/*        isPlaying*/}
                    {/*        duration={new Date(props.location.state.record.expire).getTime() - new Date()}*/}
                    {/*        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}*/}
                    {/*        onComplete={handleExpire}*/}
                    {/*    >*/}
                    {/*        {renderTime}*/}
                    {/*    </CountdownCircleTimer>*/}
                    {/*</Box>*/}

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
                    path={"note"}
                    contentClassName={classes.tab}
                >
                  <RichTextInput source={"note"}/>
                </FormTab>
            </TabbedForm>
        </Create>
    )
};
const requiredValidate = required();
