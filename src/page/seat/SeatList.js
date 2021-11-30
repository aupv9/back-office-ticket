import {
    EditButton,
    List,
    TextField,
    SearchInput,
    TopToolbar,
    FilterButton,
    SortButton,
    CreateButton,
    ExportButton,
    AutocompleteInput,
    ReferenceInput,
    ChipField,
    ReferenceField,
    Pagination
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import * as React from "react";
import CustomizableDatagrid from 'ra-customizable-datagrid';
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

const seatsFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="room_id" reference="rooms" >
        <AutocompleteInput
            optionText={(choice) =>
                choice.id
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>

];

const ListActions = (props) => {
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
        <TopToolbar className={className}>
            <FilterButton />
            <CreateButton basePath={basePath} />
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={filterValues}
                exporter={exporter}
            />
            {/*<ImportButton {...props} {...config} parseConfig={{dynamicTyping: true}} />*/}
            <ImportButton {...props} />
        </TopToolbar>
    );
};

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const SeatList = (props) =>{
    const classes = useStyles();
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filters={seatsFilters}
            pagination={<PostPagination />}
            sort={{ field: 'id', order: 'ACS' }}
            // aside={<Aside />}
            actions={<ListActions/>}
        >
            <CustomizableDatagrid rowClick={"show"}>
                <TextField source={"tier"}/>
                <TextField source={"numbers"}/>
                <ChipField source={"seatType"}/>

                {/*<TextField source={"code"}/>*/}
                <ReferenceField reference={"rooms"} source={"roomId"}>
                    <TextField source={"name"} />
                </ReferenceField>
                <EditButton />
            </CustomizableDatagrid>

        </List>
    );
}
