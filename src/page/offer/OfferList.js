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
    BooleanField, useListContext, NumberField
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

export const OfferList = (props) =>{
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

const CustomDataGrid = () =>{

    return (
        <Datagrid optimized rowClick="edit">
            <DateField source={"creationDate"} showTime/>
            <TextField source={"name"}/>
            <ChipField source={"method"} label={"Mode"}/>
            <ChipField source={"type"}/>
            <NumberField
                source="discountAmount"
                options={{
                    style: 'currency',
                    currency: 'VND',
                }}
                label={"Amount"}
            />
            {/*<NumberField*/}
            {/*    source="percentage"*/}
            {/*    options={{*/}
            {/*        style: 'percent'*/}
            {/*    }}*/}
            {/*/>*/}
            <TextField source={"percentage"} label={"%"}/>

            {/*<ReferenceField reference={"showTimesDetails"} source={"showTimesDetailId"}>*/}
            {/*    <TextField source={"id"}/>*/}
            {/*</ReferenceField>*/}
            {/*<BooleanField source={"profile"} label={"Is User"}/>*/}
            {/*<UserDetail {...props}/>*/}
            {/*<ReferenceField reference={"users"} source={"creation"}>*/}
            {/*    <TextField source={"email"} />*/}
            {/*</ReferenceField>*/}
            {/*<ChipField source={"status"}/>*/}
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

