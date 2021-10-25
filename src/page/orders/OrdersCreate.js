import {makeStyles} from "@material-ui/core/styles";
import {
    FormTab,
    ReferenceInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    Create,
    useGetIdentity,
    NullableBooleanInput,
    NumberInput, AutocompleteInput, List, Datagrid, ReferenceField,TextField
} from "react-admin";
import * as React from "react";
import {InputAdornment} from "@material-ui/core";
import {useState} from "react";



const TheaterTitle = ({ record }) =>
    record ? <span>Theater #{record.name}</span> : null;

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

const OrdersCreate = (props) =>{
    const classes = useStyles();
    const { identity, loading: identityLoading } = useGetIdentity();

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
                    <NullableBooleanInput label="Non Profile" source="nonProfile"/>
                </FormTab>
                <FormTab
                    label="movie"
                    path="movie"
                    contentClassName={classes.tab}
                >
                    <ReferenceInput
                        source="movieId"
                        reference="movies"
                        validate={requiredValidate}
                        onChange={(event) => handleChangeTheater(event)}
                    >
                        <AutocompleteInput isRequired
                                           optionText={(choice) => choice.id ?  `${choice.name}` : ''
                                           }
                        />
                    </ReferenceInput>

                    <ReferenceInput
                        source="roomId"
                        reference="rooms"
                        validate={requiredValidate}
                        filter={{}}
                    >
                        <AutocompleteInput isRequired
                                           optionText={(choice) => choice.id ?  `${choice.name}` : ''
                                           }
                        />
                    </ReferenceInput>

                    <ReferenceInput
                        source="showTimeDetailId"
                        reference="showTimesDetails"
                        validate={requiredValidate}
                        filter={{}}
                    >
                        <AutocompleteInput isRequired
                                           optionText={(choice) => choice.id ?  `${choice.name}` : ''
                                           }
                        />
                    </ReferenceInput>


                </FormTab>

            </TabbedForm>
        </Create>
    )
};
const requiredValidate = [required()];

export default OrdersCreate;

