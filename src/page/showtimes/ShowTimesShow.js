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
    ShowButton, useRedirect, useQuery, useDataProvider, List, useList,ListContextProvider
} from 'react-admin'

import {Fragment, useCallback, useEffect, useState} from "react";
import keyBy from 'lodash/keyBy';
import {Button, Typography} from "@material-ui/core";
import CustomizableDatagrid from 'ra-customizable-datagrid';
import {format} from "date-fns";

export const ShowTimesShow = (props) => {
    return (
        <Show {...props} >
            <ShowTimesContent {...props}/>
        </Show>
    )
}

const ShowTimesContent = (props) =>{
    const { record,loaded } = useShowContext();
    const [data,setData] = useState({});
    console.log(record)
    useEffect(() =>{
        setData(record)
    },[record]);

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
                {
                   data ? <SeatContent showtime={data}/> : <Loading />
                }

            </Tab>



        </TabbedShowLayout>
    )
}

const SeatContent = ({showtime}) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [sort, setSort] = useState({ field: 'id', order: 'ASC' });
    const [seats, setSeat] = useState([]);
    console.log(showtime)
    // const dataProvider = useDataProvider();
    // const props = useGetList("seats-room", {},
    //     { field: 'id', order: 'DESC' },
    //     {   showTimesId:record.id,
    //         room:record.roomId
    //     },{});

    // const fetchSeats = useCallback(async () =>{
    //     const { data: seats } = await dataProvider.getList(
    //         'orders-room',
    //         {
    //             filter: {  showTimesId:record.id,
    //                 room:record["roomId"] },
    //             sort: sort,
    //             pagination: { page, perPage },
    //         }
    //     );
    //     setSeat(seats);
    // },[record,page,perPage,sort]);

    // useEffect(() =>{
    //   fetchSeats();
    // },[record])
    const { data, total, loading, error } = useQuery({
        type: 'getList',
        resource: 'seats-room',
        payload: {
            pagination: { page, perPage },
            sort,
            filter: {
                showTimesId:showtime.id,
                room:showtime["roomId"]
            },
        }
    });
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>ERROR: {error}</p>
    }

    return (
        <Fragment>
            <Datagrid
                data={keyBy(data, 'id')}
                ids={data.map(({id}) => id)}
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
    )
}




