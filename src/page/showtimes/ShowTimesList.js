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
    EditButton,
    ChipField
} from "react-admin";

import {makeStyles} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import * as React from "react";
import { ImportButton } from "react-admin-import-csv";


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
    <SearchInput source="q" alwaysOn  />,
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
    // <ReferenceInput source="theaterId" reference="theaters">
    //     <AutocompleteInput
    //         optionText={(choice) =>
    //             choice.id
    //                 ? `${choice.name}`
    //                 : ''
    //         }
    //     />
    // </ReferenceInput>,

];





const ListActions = (props) => {
    const {
        className,
        basePath,
        total,
        resource,
        currentSort,
        filterValues,
        exporter,
    } = props;
    const config = {
        logging: true,
        validateRow: async (row) => {
            if (row.id) {
                // throw new Error("AAAA");
            }
        },
        postCommitCallback: reportItems => {
            console.log('reportItems', {reportItems});
        },
        disableImportNew: true,
        disableImportOverwrite: true,
        transformRows: (row) =>{
            return row
        }

    };
    return (
        <TopToolbar className={className}>
            <FilterButton />
            <CreateButton basePath={basePath} />
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={filterValues}
                exporter={exporter}
            />
            <ImportButton {...props} {...config} parseConfig={{dynamicTyping: true}} />
        </TopToolbar>
    );
};

export const ShowTimesList = (props) =>{
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
            actions={<ListActions/>}
        >
            <Datagrid optimized rowClick="show">
                <ReferenceField label="Movie Name" source="movieId" reference="movies">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Movie Thumbnail" source="movieId" reference="movies">
                    <ImageField source="thumbnail" />
                </ReferenceField>

                <DateField source="timeStart"  locales="VN" showTime options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric',hour:'numeric',minute:'numeric'}}
                           label={"Day Show Times"}/>
                {/*<TextField source="timeStart" />*/}
                <ReferenceField label="Room" source="roomId" reference="rooms">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Theater" source="roomId" reference="rooms" sortable={false} >
                    <ReferenceField reference="theaters" source="theaterId" link={(record, reference) => `/${reference}/${record.theaterId}`}>
                        <TextField source="name" />
                    </ReferenceField>
                </ReferenceField>
                <ReferenceField label="Location" source="roomId" reference="rooms" sortable={false} >
                    <ReferenceField reference="theaters" source="theaterId" >
                        <ReferenceField reference="locations" source="locationId" link={(record, reference) => `/${reference}/${record.locationId}`}>
                            <TextField source="name" />
                        </ReferenceField>
                    </ReferenceField>
                </ReferenceField>
                <ChipField source={"status"}/>
                <ChipField source={"countSeatAvailable"} label={"Count Seat Available"}/>
                <EditButton />
            </Datagrid>
        </List>
    );
}

