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
    BooleanField, useListContext, NumberField, ShowButton,BulkDeleteButton
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, useMediaQuery} from "@material-ui/core";
import * as React from "react";
import CustomizableDatagrid from 'ra-customizable-datagrid';
import {Fragment} from "react";
import {ImportButton} from "react-admin-import-csv";


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
        <CreateButton />
    </TopToolbar>
);

const OfferBulkActionButtons = props => {
    const {selectedIds} = props;
    console.log(selectedIds);
    const {
        className,
        basePath,
        total,
        resource,
        currentSort,
        filterValues,
        exporter,
    } = props;
    const config = {
        logging: true,
        validateRow: async (row) => {
            if (row.id) {
                // throw new Error("AAAA");
            }
        },
        postCommitCallback: reportItems => {
            console.log('reportItems', {reportItems});
        },
        disableImportNew: true,
        disableImportOverwrite: true,
    };
    return (
        <Fragment>
            {/* default bulk delete action */}
            <BulkDeleteButton  {...props} />
            <ImportButton {...props} {...config} parseConfig={{dynamicTyping: true}} />
        </Fragment>
    );
}


export const OfferList = (props) =>{
    const classes = useStyles();
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List
            bulkActionButtons={<OfferBulkActionButtons />}
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
        <CustomizableDatagrid rowClick={"show"} {...props}>
            <DateField source={"creationDate"} showTime/>
            <TextField source={"name"}/>
            <ChipField source={"method"} label={"Mode"}/>
            <ChipField source={"type"}/>
            <ChipField source={"status"}/>
            <ChipField source={"maxTotalUsage"} label={"Count Usage Remain"}/>
            <NumberField
                source="discountAmount"
                options={{
                    style: 'currency',
                    currency: 'VND',
                }}
                label={"Amount"}
            />
            <TextField source={"percentage"} label={"%"}/>
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

