import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import {useDataProvider, useGetList, useTranslate} from 'react-admin';
import {format, subDays, addDays, isToday} from 'date-fns';
import { ResponsivePieCanvas } from '@nivo/pie'
import {useCallback, useEffect, useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const lastDay = new Date();



export const RoomRevenueToDay = () => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const [selectedDate, handleDateChange] = useState(new Date());

    const {data:dataRoom,ids:dataRoomIds} = useGetList("rooms", { page: 1, perPage: 10000 });
    const {data:dataOrder,ids:dataOrderIds,loaded} = useGetList("order-dashboard", {},{},{
        date:format(selectedDate,"yyyy-MM-dd")
    });

    const [rooms,setRoom] = useState([]);
    const [dataChart,setDataChart] = useState([]);
    const [orders,setOrders] = useState([]);


    useEffect(() => {
        const rooms = dataRoomIds.map(id => dataRoom[id]);
        setRoom(rooms);
        const orders = dataOrderIds.map(id => dataOrder[id]);
        setOrders(orders);

        const aggregateOrdersByRoom= (orders) =>
            orders
                .filter((order) => order.status === 'payment')
                .reduce((acc, curr) => {
                    const room = curr["roomName"];
                    if (!acc[room]) {
                        acc[room] = 0;
                    }
                    acc[room] += curr.total;
                    return acc;
                }, {});

        const getRevenuePerRoom = (orders) => {
            const roomsWithRevenue = aggregateOrdersByRoom(orders);
            return rooms.map(room => ({
                id: room["name"],
                label:room["name"],
                value: roomsWithRevenue[room["name"]] || 0

            }));
        };
        setDataChart(getRevenuePerRoom(orders));
    },[dataRoomIds,dataRoom,dataOrderIds,dataOrder]);


    if (!orders) return null;



    return (
        <Card>
            <CardHeader title={translate('pos.dashboard.revenue_room_per_day')}
                        action={
                            <>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Date"
                                        format="yyyy-MM-dd"
                                        value={selectedDate}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={date => handleDateChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                            </>
                        }
            />
            <CardContent>
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsivePieCanvas
                        data={dataChart}
                        valueFormat=" >-0,~r"
                        margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: 'paired' }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor="#333333"
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'right',
                                direction: 'column',
                                justify: false,
                                translateX: 140,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 60,
                                itemHeight: 14,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 14,
                                symbolShape: 'circle'
                            }
                        ]}
                    />
                </div>
            </CardContent>
        </Card>
    );
};


