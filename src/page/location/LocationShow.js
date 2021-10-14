import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import {
    ShowBase,
    TextField,
    ReferenceManyField,
    SelectField,
    useShowContext,
    useRecordContext,
    useListContext, useGetOne, Datagrid, useGetList, SimpleShowLayout, Show, useShowController
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
import {LocationCitySharp, TheatersSharp} from "@material-ui/icons";
import {LocationAside} from "./LocationAside";



export const LocationShow = (props) =>{
    return (
        <ShowBase {...props}>
            <LocationShowContent/>
        </ShowBase>
        )
}



const LocationShowContent = () =>{
    const { record , loaded } = useShowContext();
    const { data, loading, error } = useGetOne('location-theater', record.id);
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
                            {data && (
                                <Tab
                                    label={
                                        data.count > 1
                                            ?`${data.count} Theaters`
                                            :  `${data.count} Theater`
                                    }
                                />
                            )}
                        </Tabs>
                        <Divider />
                        <TabPanel value={value} index={0}>
                            <ReferenceManyField
                                reference="theaters"
                                target="location_id"
                                sort={{ field: 'id', order: 'ASC' }}
                            >
                              <TheaterIterator />
                            </ReferenceManyField>
                        </TabPanel>
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


const TheaterIterator = () => {
    const { data, ids, loaded } = useListContext();
    const record = useRecordContext();

    const now = Date.now();
    if (!loaded) return null;
    return (
        <Box>
            <List>
                {ids.map(id => {
                    const theater = data[id];
                    return (
                        <ListItem
                            button
                            key={id}
                            component={RouterLink}
                            to={`/theaters/${id}/show`}
                        >
                            {/*<ListItemAvatar>*/}
                            {/*    <Avatar record={contact} />*/}
                            {/*</ListItemAvatar>*/}
                            <ListItemText
                                primary={`${theater.name}`}
                            />
                            <ListItemSecondaryAction>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="span"
                                >
                                    {/*last activity{' '}*/}
                                    {/*{formatDistance(*/}
                                    {/*    new Date(contact.last_seen),*/}
                                    {/*    now*/}
                                    {/*)}{' '}*/}
                                    {/*ago <Status status={contact.status} />*/}
                                    {

                                    }
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Box textAlign="center" mt={1}>
                <CreateRelatedThaeterButton record={record} />
            </Box>
        </Box>
    );
};

const CreateRelatedThaeterButton = ({ record }) => (
    <Button
        component={RouterLink}
        to={{
            pathname: '/theaters/create',
            state: { record: { company_id: record.id } },
        }}
        color="primary"
        variant="contained"
        size="small"
        startIcon={<TheatersSharp />}
    >
        Add Theater
    </Button>
);
