import * as React from "react";
import {Show, TextField, useGetList, useShowContext, Datagrid, Pagination, Loading, ReferenceManyField,SimpleShowLayout} from 'react-admin'


export const OfferShow = (props) => {

    return (
        <Show {...props} >
            <OfferContent />
        </Show>
    )
}

const OfferContent = () =>{
    const { record } = useShowContext();
    const { data, ids, loading, error } = useGetList(
        'offers-detail',
        { page: 1, perPage: 25 },
        { field: 'offerId', order: 'ASC' }
    );
    if (loading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }

    return(
        <SimpleShowLayout>
            <ReferenceManyField reference="offers-detail" target="offer_id" addLabel={false}>
                <Datagrid>
                    <TextField source="code" />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    )
}

const OfferDetailPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;



