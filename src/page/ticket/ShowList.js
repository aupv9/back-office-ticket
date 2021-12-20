import {
    Datagrid,
    List,
    SearchInput,
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
    DateField,
    TextField,
    ImageField,
    ReferenceField,
    ReferenceInput,
    DateInput,
    AutocompleteInput,
    SelectInput,
    ShowButton,
    EditButton, useGetList, Loading, ChipField,BooleanInput
} from "react-admin";

import {makeStyles} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import * as React from "react";



const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    unLink:{
        textDecoration:'none'
    }
}));

const roomFilters = [
    // <SearchInput source="q" alwaysOn  />,
    <ReferenceInput source="room_id" reference="rooms">
        <AutocompleteInput
            optionText={(choice) =>
                choice.id ? `${choice.name}` : ''
            }
        />
    </ReferenceInput>,
    <ReferenceInput source="movie_id" reference="movies">
        <AutocompleteInput
            optionText={(choice) =>
                choice.id
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <DateInput source="date_start" locales="VN" />,
    // <SelectInput source="time_start" choices={[
    //     { id: '00:00', name: '00:00' },
    //     { id: '00:15', name: '00:15' },
    //     { id: '00:30', name: '00:30' },
    //     { id: '00:45', name: '00:45' },
    //     { id: '10:00', name: '10:00' },
    //     { id: '10:15', name: '10:15' },
    //     { id: '10:30', name: '10:30' },
    //     { id: '11:00', name: '11:00' },
    // ]} />,
    <BooleanInput label="Movie Now Playing" source="now_playing" alwaysOn />,
    <BooleanInput label="Coming Soon" source="coming_soon" alwaysOn />


];


const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <ExportButton/>
    </TopToolbar>
);


export const ShowList = (props) =>{


    const classes = useStyles();
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <List
            {...props}
            filters={roomFilters}
            sort={{ field: 'id', order: 'ACS' }}
            perPage={10}
            // aside={<ShowTimesAside />}
            actions={<ListActions/>}
            hasCreate
            bulkActionButtons={false}
        >
            <Datagrid optimized >
                <ReferenceField label="Movie Name" source="movieId" reference="movies">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Movie Thumbnail" source="movieId" reference="movies">
                    <ImageField source="thumbnail" />
                </ReferenceField>
                <DateField source="timeStart"  locales="VN" showTime options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric',hour:'numeric',minute:'numeric'}}
                           label={"Day Show Times"}/>
                <ReferenceField label="Room" source="roomId" reference="rooms">
                    <TextField source="name" />
                </ReferenceField>
                <ChipField source={"status"}/>
                <ChipField source={"countSeatAvailable"} label={"Count Seat Available"}/>
                <EditButtonCustom/>
            </Datagrid>
        </List>
    );
}

const EditButtonCustom = (props) =>{
    const {record} = props;
    return record["status"] !== "Expire" && <EditButton label="Pick" {...props}/>
}

