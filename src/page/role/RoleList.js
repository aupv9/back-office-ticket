import {
    EditButton,
    List,
    TextField,
    ReferenceField,
    SearchInput,
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
    AutocompleteInput,
    ReferenceInput,
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, useMediaQuery} from "@material-ui/core";
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
    <ReferenceInput source="theater_id" reference="theaters">
        <AutocompleteInput
            optionText={(choice) =>
                choice.id
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,

];

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <ExportButton/>
        <CreateButton />
    </TopToolbar>
);

export const RoleList = (props) =>{
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
            hasCreate={true}
        >
            <CustomDataGrid {...props}/>
        </List>
    );
}

const CustomDataGrid = (props) =>{

    return (
        <CustomizableDatagrid {...props} rowClick={"show"}>
            <TextField source={"name"} label={"Role Name"}/>
            <EditButton />
        </CustomizableDatagrid>

    )
}

const UserDetail = ({record}) =>{
    console.log(record)
    return record.profile ? (
        <ReferenceField reference={"users"} source={"userId"}>
            <TextField source={"email"}/>
        </ReferenceField>
    ) :(
        <Typography>
            {""}
        </Typography>
    )
}

