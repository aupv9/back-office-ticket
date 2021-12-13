import {
    List, TextField, ReferenceField,
    SearchInput, TopToolbar, FilterButton, ExportButton, DateField, ChipField,
    BooleanField, DateInput, CreateButton, NullableBooleanInput,EditButton
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
    // <SearchInput source="q" alwaysOn />,
    // <ReferenceInput source="theater_id" reference="theaters">
    //     <AutocompleteInput
    //         optionText={(choice) =>
    //             choice.id
    //                 ? `${choice.name}`
    //                 : ''
    //         }
    //     />
    // </ReferenceInput>,
    <DateInput source={"creationDate"} />,
    <DateInput source={"startDate"} />,
    <DateInput source={"endDate"} />,
    <NullableBooleanInput label="Is Profile" source="profile" />
];

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton />
        <ExportButton />
        <CreateButton />
    </TopToolbar>
);

export const MemberList = (props) => {
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
            hasCreate
        >
            <CustomDataGrid {...props}/>
        </List>
    );
}

const CustomDataGrid = (props) =>{

    return (
        <CustomizableDatagrid optimized rowClick="show">
            <ChipField source={"number"}/>
            <ChipField source={"cmnd"}/>

            <ReferenceField reference={"users"} source={"userId"} >
                <TextField source={"fullName"}/>
            </ReferenceField>

            <DateField source={"startDate"} />
            <DateField source={"endDate"} />
            <DateField source={"birthday"} />

            <TextField source={"point"}/>
            <ChipField source={"level"} />
            <BooleanField source="profile" />
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

