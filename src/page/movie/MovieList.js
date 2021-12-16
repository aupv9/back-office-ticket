import {Box, useMediaQuery} from "@material-ui/core";
import {
    CreateButton, ExportButton,
    FilterButton, FilterContext, FilterForm,
    ListBase, Pagination,
    ReferenceInput,
    SearchInput,
    SelectInput,
    SortButton, Title,
    TopToolbar, useListContext, usePermissions
} from "react-admin";
import * as React from "react";
import MovieGridView from "./MovieGridView";
import {useEffect, useState} from "react";
import * as _ from "lodash";
import {ImportButton} from "react-admin-import-csv";

const MovieList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <ListBase
            perPage={20}
            sort={{ field: 'id', order: 'ASC' }}
            {...props}
        >
            <MovieListView isSmall={isSmall} {...props}/>
        </ListBase>
    );
};

export const productFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput
        source="location_id"
        reference="locations"
        sort={{ field: 'id', order: 'ASC' }}
    >
        <SelectInput source="name" />
    </ReferenceInput>,
];

const ListActions = (props) =>{
    const { loaded, permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const isHavePermission = (permission) =>{
        return _.includes(arrPermission,permission);
    }
    useEffect(() =>{
        setArrPermission(permissions);
    },[permissions])
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
            // transformRows: (row) =>{
            //
            //     return Promise.resolve();
            // }

    };
    return (
        <TopToolbar>
            <SortButton fields={['id', 'name']} />
            <CreateButton basePath="/movies" />
            <ExportButton />
            <ImportButton {...props} {...config} parseConfig={{dynamicTyping: true}} />
        </TopToolbar>
    )

}



const MovieListView = (props) => {
    const { defaultTitle } = useListContext();
    const {isSmall} = props;
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <FilterContext.Provider value={productFilters}>
                <ListActions {...props}/>
                    <Box m={1}>
                        <FilterForm />
                    </Box>
            </FilterContext.Provider>
            <Box display="flex">
                <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
                    <MovieGridView />
                    <Pagination rowsPerPageOptions={[10, 20, 40]} />
                </Box>
            </Box>
        </>
    );
};
export default MovieList;
