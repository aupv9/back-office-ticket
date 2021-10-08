import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import {
    ShowBase,
    ShowProps,
    TextField,
    ReferenceManyField,
    SelectField,
    useShowContext,
    useRecordContext,
    useListContext, useGetOne, Datagrid, useGetList,
} from 'react-admin';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Tabs,
    Tab,
    Divider,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Link as RouterLink, useParams} from 'react-router-dom';
import { formatDistance } from 'date-fns';
import {LocationCitySharp} from "@material-ui/icons";
import {LocationAside} from "./LocationAside";



export const LocationShow = (props) =>{
    return (
        <ShowBase {...props}>
            <LocationShowContent />
        </ShowBase>
        )
}



const LocationShowContent = () =>{
    const { record , loaded } = useListContext();
    console.log(record)
    // const { data, loading, error } = useGetOne('location-theater', record.id);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if (!loaded || !record) return null;
    return (
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex" mb={1}>
                            <LocationCitySharp color={"disabled"}/>
                            <Box ml={2} flex="1">
                                <Typography variant="h5">
                                    {record.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                        >
                            {/*{data && (*/}
                            {/*    <Tab*/}
                            {/*        label={*/}
                            {/*            data.id === 1*/}
                            {/*                ? '1 Theater'*/}
                            {/*                : `${data.id} Theaters`*/}
                            {/*        }*/}
                            {/*    />*/}
                            {/*)}*/}
                        </Tabs>
                        <Divider />
                        <TabPanel value={value} index={0}>
                            <ReferenceManyField
                                reference="theaters"
                                target="location_id"
                                sort={{ field: 'id', order: 'ASC' }}
                            >
                                <Datagrid>
                                    <TextField source={"name"}/>
                                </Datagrid>
                            </ReferenceManyField>
                        </TabPanel>
                        {/*<TabPanel value={value} index={1}>*/}
                        {/*    <ReferenceManyField*/}
                        {/*        reference="deals"*/}
                        {/*        target="company_id"*/}
                        {/*        sort={{ field: 'name', order: 'ASC' }}*/}
                        {/*    >*/}
                        {/*    </ReferenceManyField>*/}
                        {/*</TabPanel>*/}
                    </CardContent>
                </Card>
            </Box>
            <LocationAside record={record} link={"edit"}/>
        </Box>
    );
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
};
