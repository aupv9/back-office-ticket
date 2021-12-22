import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    ReferenceField,
    SearchInput,
    TopToolbar,
    FilterButton,
    SortButton,
    CreateButton,
    ExportButton,
    AutocompleteInput,
    ReferenceInput,
    DateField,
    ChipField,
    BooleanField, useListContext
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, useMediaQuery} from "@material-ui/core";
import * as React from "react";
import CustomizableDatagrid from 'ra-customizable-datagrid';
import TicketShow from "./TicketShow";



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
        <ExportButton/>
    </TopToolbar>
);

export const MyOrder = (props) =>{
    const classes = useStyles();
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filter={{showTimes_id:0,creation:0}}
            filters={roomFilters}
            sort={{ field: 'createdDate', order: 'DESC' }}
            perPage={25}
            // aside={<Aside />}
            actions={<ListActions/>}

        >
           <CustomDataGrid {...props}/>
        </List>
    );
}

const CustomDataGrid = (props) =>{
    const {data,ids} = useListContext();
    return (
        <CustomizableDatagrid optimized rowClick="show" expand={<TicketShow />}>
            <ChipField source={"code"}/>

            <DateField source={"createdDate"} showTime/>
            <DateField source={"updatedAt"} showTime/>

            <ReferenceField reference={"showTimesDetails"} source={"showTimesDetailId"}>
                <TextField source={"id"}/>
            </ReferenceField>
            <BooleanField source={"profile"} label={"Is User"}/>
            <BooleanField source={"online"} label={"Online"}/>

            <UserDetail {...props}/>
            <ReferenceField reference={"users"} source={"creation"}>
                <TextField source={"email"} />
            </ReferenceField>
            <ChipField source={"status"}/>
            <DateField source={"expirePayment"} showTime/>
            <TextField source={"note"}/>

            <EditButton />
        </CustomizableDatagrid>

    )
}

const UserDetail = ({record}) =>{
    return record.profile ? (
        <ReferenceField reference={"users"} source={"userId"}>
            <TextField source={"email"}/>
        </ReferenceField>
    ) :(
        <TextField source={""} label={"User"}/>

    )
}

