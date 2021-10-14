import {
    AutocompleteInput,
    Edit,
    FormTab,
    ReferenceInput,
    required,
    TabbedForm, useEditContext
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useState} from "react";

import { DateKeyInput} from '../../datepicker/Picker';


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


export const ShowTimesEdit = (props) =>{
    const classes = useStyles();
    const {record} = useEditContext();
    const [theater,setTheater] = useState(record ? record.theaterId : 0);
    const handleChangeTheater = (event) =>{
        setTheater(event);
        localStorage.setItem("theaterId",theater);
    }
    return(
        <Edit {...props} >
            <TabbedForm>
                <FormTab
                    label="summary"
                    contentClassName={classes.tab}
                >
                    <ReferenceInput reference="movies" source="movieId" >
                        <AutocompleteInput
                            optionText={(choice) =>
                                choice.id ? `${choice.name}` : ''
                            }
                        />
                    </ReferenceInput>

                    <ReferenceInput reference="theaters" source="theaterId" perPage={1000} onChange={handleChangeTheater}>
                        <AutocompleteInput
                            optionText={(choice) =>
                                choice.id ? `${choice.name}` : ''
                            }
                        />
                    </ReferenceInput>
                    <ReferenceInput reference="rooms" source="roomId" perPage={1000} filter={{ theater_id: theater }}>
                        <AutocompleteInput
                            optionText={(choice) =>
                                choice.id ? `${choice.name}` : ''
                            }
                        />
                    </ReferenceInput>
                    <DateKeyInput source="timeStart" label="Start date"  />
                </FormTab>

            </TabbedForm>
        </Edit>
    )
};

const EditContent = () =>{
    const classes = useStyles();
    const {record} = useEditContext();
    const [theater,setTheater] = useState(record ? record.theaterId : 0);
    const handleChangeTheater = (event) =>{
        setTheater(event);
        localStorage.setItem("theaterId",theater);
    }
    return(
        <TabbedForm>
            <FormTab
                label="summary"
                contentClassName={classes.tab}
            >
                <ReferenceInput reference="movies" source="movieId" >
                    <AutocompleteInput
                        optionText={(choice) =>
                            choice.id ? `${choice.name}` : ''
                        }
                    />
                </ReferenceInput>

                <ReferenceInput reference="theaters" source="theaterId" perPage={1000} onChange={handleChangeTheater}>
                    <AutocompleteInput
                        optionText={(choice) =>
                            choice.id ? `${choice.name}` : ''
                        }
                    />
                </ReferenceInput>
                <ReferenceInput reference="rooms" source="roomId" perPage={1000} filter={{ theater_id: theater }}>
                    <AutocompleteInput
                        optionText={(choice) =>
                            choice.id ? `${choice.name}` : ''
                        }
                    />
                </ReferenceInput>
                <DateKeyInput source="timeStart" label="Start date"  />
            </FormTab>

        </TabbedForm>
    )
}
const requiredValidate = required();
