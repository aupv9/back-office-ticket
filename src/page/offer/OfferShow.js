import * as React from "react";
import {
    TabbedShowLayout,
    Tab,
    Show,
    ReferenceField,
    TextField,
    DateField,
    useGetList,
    useShowContext,
    Datagrid,
    Pagination,
    ChipField,
    BooleanField,
    NumberField,
    Loading,
    List,
    ReferenceManyField
} from 'react-admin'


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
    console.log(ids)
    return(

        <TabbedShowLayout>
            <Tab label="summary">
                {
                    ids.map((id) =>{

                    })
                }

                <ReferenceManyField reference="offers-detail" target="offer_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="code" />
                    </Datagrid>
                </ReferenceManyField>
                {/*<DateField source={"creationDate"} showTime/>*/}
                {/*<TextField source={"name"}/>*/}
                {/*<ChipField source={"method"} label={"Mode"}/>*/}
                {/*<ChipField source={"type"}/>*/}
                {/*<ChipField source={"status"}/>*/}
                {/*<NumberField*/}
                {/*    source="discountAmount"*/}
                {/*    options={{*/}
                {/*        style: 'currency',*/}
                {/*        currency: 'VND',*/}
                {/*    }}*/}
                {/*    label={"Amount"}*/}
                {/*/>*/}
                {/*<TextField source={"percentage"} label={"%"}/>*/}
            </Tab>
            <Tab label="Code" path="code">
                {/*<List basePath={"offers-detail"}*/}
                {/*      filter={{offerId:record["id"]}}*/}
                {/*      perPage={25}*/}
                {/*      sort={{ field: 'offerId', order: 'ASC' }}*/}
                {/*      pagination={<OfferDetailPagination />}*/}
                {/*>*/}
                {/*    <Datagrid>*/}
                {/*        <TextField source="code" />*/}
                {/*    </Datagrid>*/}
                {/*</List>*/}
            </Tab>

        </TabbedShowLayout>
    )
}

const OfferDetailPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;



