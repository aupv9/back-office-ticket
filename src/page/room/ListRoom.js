import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    ReferenceField,
    SearchInput,
    TopToolbar,
    FilterButton, SortButton, CreateButton, ExportButton
} from "react-admin";
import TheaterNameField from "./TheaterNameField";
import {makeStyles} from "@material-ui/core/styles";
import {Button, useMediaQuery} from "@material-ui/core";
import Aside from "./Aside";
import MobileGrid from "./MobileGrid";
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

const visitorFilters = [
    <SearchInput source="q" alwaysOn />,
    // <DateInput source="last_seen_gte" />,
    // <NullableBooleanInput source="has_ordered" />,
    // <NullableBooleanInput source="has_newsletter" defaultValue />,
];

const ListActions = (props) => (
    <TopToolbar>
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
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: 'id', order: 'ACS' }}
            perPage={25}
            aside={<Aside />}
            actions={<ListActions/>}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized rowClick="edit">
                    <TextField source={"name"}/>
                    <TextField source={"code"}/>
                    <ReferenceField reference={"theaters"} source={"theaterId"}>
                        <TheaterNameField />
                    </ReferenceField>
                    <TextField source={"type"}/>
                </Datagrid>
            )}
        </List>
    );
}
