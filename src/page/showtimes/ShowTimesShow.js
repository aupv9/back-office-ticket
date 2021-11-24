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
    ShowButton, useRedirect
} from 'react-admin'

import {Fragment, useState} from "react";
import keyBy from 'lodash/keyBy';
import {Button, Typography} from "@material-ui/core";
import CustomizableDatagrid from 'ra-customizable-datagrid';

export const ShowTimesShow = (props) => {

    return (
        <Show {...props} >
            <ShowTimesContent />
        </Show>
    )
}

const ShowTimesContent = () =>{
    const { record } = useShowContext();
    console.log(record)
    const props = useGetList("seats-room", {},
        { field: 'id', order: 'DESC' }, {   showTimesId:record.id,
            room:record.roomId},{});
    return(

        <TabbedShowLayout>
            <Tab label="summary">
                <ReferenceField
                    source="movieId"
                    reference="movies"
                >
                    <TextField source="name" label="Movie Name"/>
                </ReferenceField>

                <ReferenceField reference="rooms" source="roomId" label="Theater">
                    <ReferenceField reference="theaters" source="theaterId" >
                        <ReferenceField reference="locations" source="locationId" >
                            <TextField source="name"/>
                        </ReferenceField>
                    </ReferenceField>
                </ReferenceField>

                <ReferenceField reference="rooms" source="roomId" label="Theater">
                    <ReferenceField reference="theaters" source="theaterId" >
                        <TextField source="name"/>
                    </ReferenceField>
                </ReferenceField>

                <ReferenceField
                    source="roomId"
                    reference="rooms"
                >
                    <TextField source="name" label="Room Name"/>
                </ReferenceField>

                <DateField source="timeStart"  locales="VN" showTime options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric',hour:'numeric',minute:'numeric'}}
                           label={"Day Show Times"}/>
            </Tab>
            <Tab label="Seat In Room" path="seats">
                <SeatContent {...props}/>
            </Tab>

        </TabbedShowLayout>
    )
}

const SeatContent = (props) =>{
    const { data, total, loading, error ,ids}= props;
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [sort, setSort] = useState({ field: 'id', order: 'ASC' });
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>ERROR: {error}</p>
    }

    return (
        <Fragment>
            {
                ids.length > 0 ?
                    <Fragment>

                        <Datagrid
                            data={keyBy(data, 'id')}
                            ids={ids}
                            currentSort={sort}
                            setSort={(field, order) => setSort({ field, order })}
                            rowClick={"show"}
                            hasBulkActions={true}
                            optimized

                        >
                            <TextField source="tier" />
                            <NumberField source="numbers"textAlign="left" />
                            <ChipField source="seatType" />
                            <BooleanField label="Available" source="isSelected" defaultValue />
                            <ReferenceField reference="rooms" source="roomId" >
                                <TextField source="name"/>
                            </ReferenceField>
                        </Datagrid>
                        <Pagination
                            page={page}
                            setPage={setPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            total={total}
                        />
                    </Fragment>

                :<Typography> No results found </Typography>
            }


        </Fragment>
    )
}




