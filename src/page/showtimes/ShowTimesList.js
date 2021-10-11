import {
    Datagrid,
    List,
    SearchInput,
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
    DateField,
    TextField, ImageField, ReferenceField, ReferenceInput, DateTimeInput, AutocompleteInput
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
}));

const roomFilters = [
    <SearchInput source="q" alwaysOn  />,
    <ReferenceInput source="room_id" reference="rooms">
        <AutocompleteInput
            optionText={(choice) =>
                choice.id
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <DateTimeInput source="date" />
];

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

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
            // aside={<Aside />}
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
                title={"Day Show Times"}/>

                <ReferenceField label="Room" source="roomId" reference="rooms">
                    <TextField source="name" />
                </ReferenceField>
            </Datagrid>
        </List>
    );
}

