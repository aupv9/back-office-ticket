import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import {
    ShowBase,
    TextField,
    ReferenceManyField,
    SelectField,
    useShowContext,
    useRecordContext,
    useListContext,
    useGetOne,
    Datagrid,
    useGetList,
    SimpleShowLayout,
    Show,
    useShowController,
    DateField,
    ReferenceField,ImageField
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
    Divider, Avatar,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Link as RouterLink, useParams} from 'react-router-dom';
import { formatDistance } from 'date-fns';
import {LocationCitySharp, MovieCreationSharp, TheatersSharp} from "@material-ui/icons";
import { format } from 'date-fns'
import {ShowTimesAside} from "./ShowTimesAside";


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
                            <MovieCreationSharp color={"disabled"}/>
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
                                target="showtimes_id"
                                sort={{ field: 'id', order: 'ASC' }}
                            >
                                {/*<TheaterIterator />*/}
                                <Datagrid>
                                    <ReferenceField label="Movie Name" source="movieId" reference="movies">
                                        <TextField source="name" />
                                    </ReferenceField>
                                    <ReferenceField label="Movie Thumbnail" source="movieId" reference="movies">
                                        <ImageField source="thumbnail" />
                                    </ReferenceField>
                                    <DateField source="timeStart"  locales="VN" showTime />
                                    <ReferenceField label="Room" source="roomId" reference="rooms">
                                        <TextField source="name" />
                                    </ReferenceField>
                                </Datagrid>
                            </ReferenceManyField>
                        </TabPanel>
                    </CardContent>
                </Card>
            </Box>
            <ShowTimesAside record={record} link={"edit"}/>
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
                    const startDate = new Date(showTimes["timeStart"]);

                    return (
                        <ListItem
                            button
                            key={id}
                            component={RouterLink}
                            to={`/showTimesDetails/${id}/show`}
                        >
                            <ListItemAvatar>
                                <ReferenceField
                                    reference="movies"
                                    source={showTimes["movieId"]}
                                >
                                    <TextField source="name" />
                                    <ImageField source="thumbnail" title="title" />
                                </ReferenceField>
                            </ListItemAvatar>
                            <ListItemText
                                primary={` ${showTimes.movieId}` }
                                secondary={
                                    startDate ? new Date(startDate).toLocaleString('VN') : null
                                }
                            />
                            <ListItemSecondaryAction>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="span"
                                >

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
