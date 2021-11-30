import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    ReferenceField,
    SearchInput,
    TopToolbar,
    FilterButton, SortButton, CreateButton, ExportButton,AutocompleteInput, ReferenceInput
} from "react-admin";
import TheaterNameField from "./TheaterNameField";
import {makeStyles} from "@material-ui/core/styles";
import {Button, useMediaQuery} from "@material-ui/core";
import Aside from "./Aside";
import MobileGrid from "./MobileGrid";
import * as React from "react";
import CustomizableDatagrid from 'ra-customizable-datagrid';

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
    <SearchInput source="q" alwaysOn />,
    // <ReferenceInput source="theater_id" reference="theaters">
    //     <AutocompleteInput
    //         optionText={(choice) =>
    //             choice.id
    //                 ? `${choice.name}`
    //                 : ''
    //         }
    //     />
    // </ReferenceInput>,

];

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

export const ListRoom = (props) =>{
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
            perPage={25}
            // aside={<Aside />}
            actions={<ListActions/>}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <CustomizableDatagrid rowClick={"show"}>
                    <TextField source={"name"}/>
                    {/*<TextField source={"code"}/>*/}
                    {/*<ReferenceField reference={"theaters"} source={"theaterId"}>*/}
                    {/*    <TheaterNameField />*/}
                    {/*</ReferenceField>*/}
                    <EditButton />
                </CustomizableDatagrid>
            )}
        </List>
    );
}
