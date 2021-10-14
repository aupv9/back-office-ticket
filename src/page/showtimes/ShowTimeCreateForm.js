import * as React from "react";
import {
    FormWithRedirect,
    SaveButton,
    DeleteButton, required, ReferenceInput, SelectInput, AutocompleteInput
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import {useState} from "react";
import DateFnsUtils from "@date-io/date-fns";



export const ShowTimesForm = props =>{
    const [selectedDate, handleDateChange] = useState(new Date());
    const handleSubmit = (props) =>{
        console.log(props)
    }
    return (
        <FormWithRedirect
            {...props}
            render={formProps => (
                // here starts the custom form layout
                <form onSubmit={handleSubmit}>
                    <Box p="1em">
                        <Box display="flex">

                            <Box flex={1} ml="1em">
                                <Typography variant="h6" gutterBottom>Summary</Typography>
                                <ReferenceInput
                                    source="movieId"
                                    reference="movies"
                                    validate={required()}
                                >
                                    <SelectInput source="name" />
                                </ReferenceInput>

                                <ReferenceInput source="movieId" reference="movies">
                                    <AutocompleteInput
                                        optionText={(choice) =>
                                            choice.id
                                                ? `${choice.name}`
                                                : ''
                                        }
                                    />
                                </ReferenceInput>

                                <ReferenceInput
                                    source="roomId"
                                    reference="rooms"
                                    validate={required()}
                                >
                                    <SelectInput source="name" />
                                </ReferenceInput>

                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <DatePicker value={selectedDate} onChange={handleDateChange}
                                                orientation="landscape"
                                                label="Date"
                                                inputVariant="outlined"
                                                source="date"/>
                                </MuiPickersUtilsProvider>
                            </Box>

                        </Box>
                    </Box>
                    <Toolbar>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <SaveButton
                                saving={formProps.saving}
                                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                            />
                            <DeleteButton record={formProps.record} />
                        </Box>
                    </Toolbar>
                </form>
            )}
        />
    );
}


