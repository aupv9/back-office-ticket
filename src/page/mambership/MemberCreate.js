import {
    Create,
    ReferenceInput,
    required,
    SimpleForm,
    useRedirect,
    NumberInput,
    AutocompleteInput,DateInput,regex,TextInput,BooleanInput
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useEffect, useState} from "react";

import {useHistory} from "react-router-dom";

const validateId = regex(/^\d{12}$/, 'Must be a valid CMND');

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

export const MemberCreate = (props) =>{
    const redirect = useRedirect();
    const history = useHistory();
    const  handleExpire = () =>{
        // redirect('list','payments');
        window.location.href = '#/shows';
    };
    const [isProfile,setIsProfile] = useState(false);


    const changeProfile = value =>{
        setIsProfile(value);
    }
    const classes = useStyles();

    return(
        <Create {...props}
                className={classes.root}
        >
            <SimpleForm>

                <BooleanInput label="Profile" source="profile" onChange={changeProfile}/>
                {
                   isProfile && <ReferenceInput source="userId" reference="users">
                        <AutocompleteInput
                            optionText={(choice) =>
                                choice.id
                                    ? `${choice.fullName}`
                                    : ''
                            }
                        />
                    </ReferenceInput>
                }


                <DateInput source={"creationDate"}/>
                <DateInput source={"startDate"}/>
                <DateInput source={"endDate"}/>
                <DateInput source={"birthday"}/>

                <TextInput source={"cmnd"} validate={validateId} label={"CMND"}/>
            </SimpleForm>

        </Create>
    )
};
const requiredValidate = required();
