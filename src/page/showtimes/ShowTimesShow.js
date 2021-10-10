import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import {
    ShowBase,
    TextField,
    ReferenceManyField,
    SelectField,
    useShowContext,
    useRecordContext,
    useListContext, useGetOne, Datagrid, useGetList, SimpleShowLayout, Show, useShowController, DateField
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
import { format } from 'date-fns'


export const ShowTimesShow = (props) =>{
    return (
        <ShowBase {...props}>
            <ShowTimesShowContent/>
        </ShowBase>
    )
}



const ShowTimesShowContent = () =>{
    const { record , loaded } = useShowContext();
    const { data, loading, error } = useGetOne('count-showTimesDetails', record.id);
    console.log(data)
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
                                            ?`${data.count} Show Time`
                                            :  `${data.count} Show Times`
                                    }
                                />
                            )}
                        </Tabs>
                        <Divider />
                        <TabPanel value={value} index={0}>
                            <ReferenceManyField
                                reference="showTimesDetails"
                                target="id"
                                sort={{ field: 'id', order: 'ASC' }}
                            >
                                <TheaterIterator />
                            </ReferenceManyField>
                        </TabPanel>
                    </CardContent>
                </Card>
            </Box>
            {/*<LocationAside record={record} link={"edit"}/>*/}
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
    if (!loaded) return null;
    return (
        <Box>
            <List>
                {ids.map(id => {

                    const showTimes = data[id];
                    return (
                        <ListItem
                            button
                            key={id}
                            component={RouterLink}
                            // to={`/show-times/${id}/show`}
                        >
                            {/*<ListItemAvatar>*/}
                            {/*    <Avatar record={contact} />*/}
                            {/*</ListItemAvatar>*/}
                            <ListItemText
                                primary={` ${showTimes.movieId}` }
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
                                         new Date(showTimes.timeStart).toTimeString()
                                    }
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Box textAlign="center" mt={1}>
                <CreateRelatedShowTimesButton record={record} />
            </Box>
        </Box>
    );
};

const CreateRelatedShowTimesButton = ({ record }) => (
    <Button
        component={RouterLink}
        to={{
            pathname: '/show-times/create',
            // state: { record: { company_id: record.id } },
        }}
        color="primary"
        variant="contained"
        size="small"
        startIcon={<TheatersSharp />}
    >
        Add Show Times
    </Button>
);
