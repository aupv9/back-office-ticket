import {
    Datagrid,
    List,
    SearchInput,
    TopToolbar,
    FilterButton, CreateButton, ExportButton, DateField
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
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
    <SearchInput source="q" alwaysOn />

];

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

export const ShowTimesList = (props) =>{
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
        >
            {/*{isXsmall ? (*/}
            {/*    <MobileGrid />*/}
            {/*) : (*/}
                <Datagrid optimized rowClick="show">
                    <DateField source={"startDate"} />
                    <DateField source={"endDate"}/>
                </Datagrid>
            {/*)}*/}
        </List>
    );
}
