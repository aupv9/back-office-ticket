import {
    AutocompleteInput,
    Create,
    FormTab,
    ReferenceInput,
    required,
    TabbedForm, useRedirect, useRefresh,
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useState} from "react";
import {Divider} from "@material-ui/core";
import {ShowTimesForm} from "./ShowTimeCreateForm";
import { DateKeyInput} from '../../datepicker/Picker';
import { TimeInput} from '../../datepicker/PickerTime';

import DateFnsUtils from "@date-io/date-fns";
import vi from 'date-fns/locale/vi'

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


export const ShowTimesCreate = (props) =>{
    const classes = useStyles();
    const [theater,setTheater] = useState();
    const handleChangeTheater = (event) =>{
        setTheater(event);
        localStorage.setItem("theaterId",theater);
    }
    return(
        <Create {...props} >
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
                    <ReferenceInput reference="theaters" source="theaterId" onChange={(event) => handleChangeTheater(event)}>
                        <AutocompleteInput isRequired value={theater}
                                           optionText={(choice) => choice.id ? `${choice.name}` : ''
                                               }
                        />
                    </ReferenceInput>

                    {
                        theater && theater !== (localStorage.getItem("theaterId")? parseInt(localStorage.getItem("theaterId")) : 0) ?
                            <ReferenceInput reference="rooms" source="roomId" filter={{ theater_id: theater }}>
                                    <AutocompleteInput
                                        optionText={(choice) =>
                                            choice.id ? `${choice.name}` : ''
                                        }
                                    />
                                  </ReferenceInput> :null
                    }

                    <DateKeyInput source="timeStart" label="Start date"  />
                </FormTab>

            </TabbedForm>
        </Create>
    )
};
const requiredValidate = required();
