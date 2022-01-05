import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import {useDataProvider, useGetList, useTranslate, useVersion} from 'react-admin';
import {addDays, format, subDays} from 'date-fns';
import { ResponsivePieCanvas } from '@nivo/pie'
import {useCallback, useEffect, useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const Spacer = () => <span style={{ margin:"0 5px" }} />;

export const RoomChart = () => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const {data,ids,loaded} = useGetList("rooms", { page: 1, perPage: 10000 });
    const [rooms,setRoom] = useState([]);
    const [dataChart,setDataChart] = useState([]);

    const [selectedStartDate, handleStartDateChange] = useState(subDays(new Date(),30));

    const [selectedEndDate, handleEndDateChange] = useState(new Date());
    const version = useVersion();

    const [orders,setOrders] = useState([]);

    const fetchOrder = useCallback(async () => {
        const { data: orders } = await dataProvider.getList(
            'orders-room',
            {
                filter: {
                    startDate:format(selectedStartDate,"yyyy-MM-dd"),
                    endDate:format(selectedEndDate,"yyyy-MM-dd")
                } ,
                sort: { field: 'id', order: 'DESC' },
                pagination: { page: 1, perPage: 1000000 },
            }
        );
        setOrders(orders)
    },[dataProvider,selectedStartDate,selectedEndDate]);

    useEffect(() =>{
        fetchOrder().then(r => console.log(r));
    },[selectedStartDate,selectedEndDate,version]);

    useEffect(() =>{
        const rooms = ids.map(id => data[id]);
        setRoom(rooms);
        const aggregateOrdersByRoom= (orders) =>
            orders
                .filter((order) => order.status !== 'cancelled' && order.status !== 'non_payment')
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
    },[ids,data,orders]);


    if (!orders) return null;


    return (
        <Card>
            <CardHeader title={translate('pos.dashboard.revenue_room_range')}
                        action={
                            <>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        maxDate={format(subDays(selectedEndDate,1),"dd-MM-yyyy")}
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Start Date"
                                        format="dd-MM-yyyy"
                                        value={selectedStartDate}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={date => handleStartDateChange(date)}

                                    />
                                </MuiPickersUtilsProvider>
                                <Spacer />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        minDate={addDays(selectedStartDate,1)}
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="End Date"
                                        format="dd-MM-yyyy"
                                        value={selectedEndDate}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={date => handleEndDateChange(date)}
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


