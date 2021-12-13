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
    SelectInput,
    useCreateContext,
    AutocompleteInput,
    TextInput,
    Button,
    SaveButton,
    FormWithRedirect,
    useCreate,
    useDataProvider,TabbedFormTabs
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
import {useHistory, useLocation} from "react-router-dom";
import { sub,subMinutes } from 'date-fns'
import {useRecordContext} from "ra-core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Add";
import {CheckCircleOutline} from "@material-ui/icons";

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
    form:{
        width:1000
    },
    member:{
        width:300,
        marginRight:100
    },
    flex:{
        display: 'flex',
        alignItems: 'center'
    },
    buttonCheck:{
        width:1500
    }
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
    const {state} = useLocation();
    const [duration,setDuration] = useState(0);
    const [member,setMember] = useState(0);
    const dataProvider = useDataProvider();
    const redirect = useRedirect();
    const [record,setRecord] = useState({});

    const history = useHistory();
    const  handleExpire = () =>{
        window.location.href = '#/shows';
    };
    const [create, { loading }] = useCreate('');


    const classes = useStyles();
    const handleSubmit = async values => {
        console.log(values)
        // create(
        //     { payload: { data: values } },
        //     {
        //         onSuccess: ({ data }) => {
        //
        //         },
        //         onFailure: ({ error }) => {
        //         }
        //     }
        // );
    };
    const handleClick = async value =>{
        const {data} = await dataProvider.getOne("members",{id:member});

    }

    const changeMember = value =>{
        setMember(value);
    }
    return(
        <Create {...props} className={classes.form}>

            <TabbedForm onSubmit={handleSubmit} tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}>

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

                    <ReferenceInput reference={"payments-method"} source={"paymentMethodId"}>
                        <SelectInput source={"name"} />
                    </ReferenceInput>

                    <div className={classes.flex}>
                        <ReferenceInput reference={"members"} source={"numberMember"} className={classes.member} onChange={changeMember}>
                            <AutocompleteInput
                                optionText={(choice) =>
                                    choice.id
                                        ? `${choice.number} ${choice.level}`
                                        : ''
                                }
                            />
                        </ReferenceInput>
                        {/*<Button onClick={handleClick} label="Check" color={"primary"} className={classes.buttonCheck}>*/}
                        {/*    <CheckCircleOutline />*/}
                        {/*</Button>*/}
                    </div>


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
                  <TextInput source={"note"} multiline/>
                </FormTab>
            </TabbedForm>
        </Create>
    )
};
const requiredValidate = required();
