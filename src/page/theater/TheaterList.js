import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    FilterButton,
    FilterForm,
    FilterContext,
    InputProps,
    ListBase,
    ListProps,
    NumberInput,
    Pagination,
    ReferenceInput,
    SearchInput,
    SelectInput,
    SortButton,
    Title,
    TopToolbar,
    useListContext,
    useTranslate
} from 'react-admin';
import {Box} from "@material-ui/core";
import Aside from "./TheaterAside";
import GridList from "./GridList";


const {useMediaQuery} = require("@material-ui/core");

const TheaterList = (props) => {

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <ListBase
            perPage={20}
            sort={{ field: 'id', order: 'ASC' }}
            {...props}
        >
            <TheaterListView isSmall={isSmall} />
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
    // <NumberInput source="width_gte" />,
    // <NumberInput source="width_lte" />,
    // <NumberInput source="height_gte" />,
    // <NumberInput source="height_lte" />,
    // <QuickFilter
    //     label="resources.products.fields.stock_lte"
    //     source="stock_lte"
    //     defaultValue={10}
    // />,
];

const ListActions = ({ isSmall }) => (
    <TopToolbar>
        {isSmall && <FilterButton />}
        <SortButton fields={['id', 'name', 'code']} />
        <CreateButton basePath="/theaters" />
        <ExportButton />
    </TopToolbar>
);


const TheaterListView = ({ isSmall }) => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <FilterContext.Provider value={productFilters}>
                <ListActions isSmall={isSmall} />
                {isSmall && (
                    <Box m={1}>
                        <FilterForm />
                    </Box>
                )}
            </FilterContext.Provider>
            <Box display="flex">
                <Aside />
                <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
                    <GridList />
                    <Pagination rowsPerPageOptions={[10, 20, 40]} />
                </Box>
            </Box>
        </>
    );
};
export default TheaterList;
