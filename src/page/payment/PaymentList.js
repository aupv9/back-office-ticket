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
    BooleanField, useListContext, NumberField,DateInput
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, useMediaQuery} from "@material-ui/core";
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
        <FilterButton/>
        <ExportButton/>
    </TopToolbar>
);

export const PaymentList = (props) => {
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
        >
            <CustomDataGrid {...props}/>
        </List>
    );
}

const CustomDataGrid = (props) =>{

    return (
        <Datagrid optimized rowClick="show">
            <DateField source={"createdDate"} showTime/>
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

            {/*<DateField source={"expirePayment"} showTime/>*/}
            {/*<TextField source={"note"}/>*/}
        </Datagrid>

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

