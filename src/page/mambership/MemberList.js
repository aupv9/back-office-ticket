import {
    List,
    TextField,
    ReferenceField,
    SearchInput,
    TopToolbar,
    FilterButton,
    ExportButton,
    DateField,
    ChipField,
    NumberField, DateInput, CreateButton
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
    // <ReferenceInput source="theater_id" reference="theaters">
    //     <AutocompleteInput
    //         optionText={(choice) =>
    //             choice.id
    //                 ? `${choice.name}`
    //                 : ''
    //         }
    //     />
    // </ReferenceInput>,
    <DateInput source={"created_date"} />

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
            filter={{creation:0,method:0}}
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
            <DateField source={"creationDate"} showTime/>
            <ReferenceField reference={"my-orders"} source={"partId"}>
                <TextField source={"id"}/>
            </ReferenceField>
            <ChipField source={"useFor"} label={"Type"}/>
            <ReferenceField reference={"payments-method"} source={"paymentMethodId"} link={false}>
                <ChipField source={"name"}/>
            </ReferenceField>
            {/*<BooleanField source={"profile"} label={"Is User"}/>*/}
            {/*<UserDetail {...props}/>*/}
            <ReferenceField reference={"users"} source={"creation"}>
                <TextField source={"email"} />
            </ReferenceField>
            <ChipField source={"status"}/>
            <NumberField
                source="amount"
                options={{
                    style: 'currency',
                    currency: 'VND',
                }}
            />
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

