import {
    AutocompleteInput,
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    Edit,
    SimpleForm,
    FormTab,
    Loading,
    NumberField,
    Pagination,
    PasswordInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    Tab,
    TabbedForm,
    TabbedShowLayout,
    TextField,
    TextInput,
    useEditContext,
    useGetList,
    useShowContext,
    Toolbar,
    SaveButton,
    TabbedFormTabs,
    useMutation,FormWithRedirect,DateInput,DeleteButton
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {Fragment, useCallback, useState} from "react";

import { DateKeyInput} from '../../datepicker/Picker';
import keyBy from "lodash/keyBy";
import {Box, Button, Card, CardContent, Container, Typography} from "@material-ui/core";
import {LocationCard} from "../location/LocationCard";


const useStyles = makeStyles({
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
    tab: {
        // maxWidth: '40em',
        display: 'block',
        justifyContent:'center'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 1008,
        gap: '10px',

    }
});


export const ShowEdit = (props) =>{
    const classes = useStyles();


    return(
        <Edit {...props} >
            <CustomMyForm />
        </Edit>
    )
};


const CustomMyForm = props =>{

    const {record} = useEditContext();
    const prop = useGetList("seats-room", {},
        { field: 'id', order: 'DESC' }, {   showTimesId:record.id,
            room:record.roomId},{});
    console.log(prop.ids)
    return  (
        <FormWithRedirect
            {...props}
            render={formProps => (
                // here starts the custom form layout
                <form>
                    <Box p="1em">
                        <Box display="flex">
                            <Box flex={2} mr="1em">
                                {/*<Stage data={}/>*/}
                                 <SeatContent data={prop.data} ids={prop.ids}/>
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
    )
}



const SeatContent = ({data,ids}) =>{
    const classes = useStyles();
    return (
        <Fragment>
            <Container>
                <Stage data={data} ids={ids}/>
            </Container>
        </Fragment>
    )
}

const Stage = ({ids,data}) =>{
    const classes = useStyles();

    return (
            <>
                <Box display="flexWrap">

                </Box>

                <Box  display="flexWrap"  >
                    <Box flex={1} >
                        {
                            ids.length > 0 ?
                                <Box className={classes.gridList}>
                                    {ids.map((id) => (
                                        // <LocationCard key={id} record={data[id]}/>
                                        <Button variant="contained">{data[id]["tier"]}{' '}{data[id]["numbers"]}</Button>
                                    ))}
                                </Box>

                                :<Typography> No results found </Typography>
                        }
                    </Box>
                 </Box>
            </>


    )
}
