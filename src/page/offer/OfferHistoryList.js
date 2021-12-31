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
    BooleanField, useListContext, NumberField, useGetOne
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

export const OfferHistoryList = (props) =>{
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
            // filter={{offerId:0,userId:0,orderId:0}}
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
        <CustomizableDatagrid >
            <ReferenceField reference={"offers"} source={"offerId"} label={"Offer Name"}>
                <TextField source={"name"}/>
            </ReferenceField>
            <ReferenceField reference={"offers"} source={"offerId"} label={"Offer Type"}>
                <TextField source={"type"}/>
            </ReferenceField>
            <ReferenceField reference={"offers"} source={"offerId"} label={"Offer Method"}>
                <TextField source={"method"}/>
            </ReferenceField>
            <ReferenceField reference={"orders"} source={"orderId"} label={"Orders"}>
                <TextField source={"id"}/>
            </ReferenceField>
            <TextField source={"code"}/>
            <DateField source={"timeUsed"} showTime/>

            <NumberField
                source="totalDiscount"
                options={{
                    style: 'currency',
                    currency: 'VND',
                }}
                label={"Discount Amount"}
            />
            <ChipField source={"status"}/>

        </CustomizableDatagrid>
    )
}

// const OfferDetail = ({record}) =>{
//
//     const {data,loaded} = useGetOne("offers",record.id);
//
//     return loaded ? (
//
//     )
// }


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

