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

const MovieList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <ListBase
            perPage={20}
            sort={{ field: 'id', order: 'ASC' }}
            {...props}
        >
            <MovieListView isSmall={isSmall} />
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

const ListActions = ({ isSmall }) =>{
    const { loaded, permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const isHavePermission = (permission) =>{
        return _.includes(arrPermission,permission);
    }
    useEffect(() =>{
        setArrPermission(permissions);
    },[permissions])

    return  isHavePermission("CREATE_MOVIE") ? (
        <TopToolbar>
            {isSmall && <FilterButton />}
            <SortButton fields={['id', 'name']} />
            <CreateButton basePath="/movies" />
            <ExportButton />
        </TopToolbar>
    ) :(
        <TopToolbar>
            {isSmall && <FilterButton />}
            <SortButton fields={['id', 'name']} />
            <ExportButton />
        </TopToolbar>
    );
}



const MovieListView = ({ isSmall }) => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <FilterContext.Provider value={productFilters}>
                <ListActions isSmall={isSmall} />
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
