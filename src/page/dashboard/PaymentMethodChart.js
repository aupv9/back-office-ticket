import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import {useDataProvider, useGetList, useTranslate} from 'react-admin';
import { format, subDays, addDays } from 'date-fns';
import { ResponsivePieCanvas } from '@nivo/pie'
import {useCallback, useEffect, useState} from "react";




export const PaymentMethodChart = (props) => {
    const { orders } = props;
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const {data,ids,loaded} = useGetList("payments", { page: 1, perPage: 10000 });
    const [payment,setPayment] = useState([]);
    const [dataChart,setDataChart] = useState([]);


    useEffect(() =>{
        const payments = ids.map(id => data[id]);
        setPayment(payments);
        const aggregateOrdersByRoom= (payment) =>
            orders
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
            return payments.map(payment => ({
                id: payment["name"],
                label:payment["name"],
                value: roomsWithRevenue[payment["name"]] || 0

            }));
        };
        setDataChart(getRevenuePerRoom(orders));
    },[ids,data]);

    if (!orders) return null;

    console.log(dataChart)


    return (
        <Card>
            <CardHeader title={translate('30 Day Revenue History All Room')} />
            <CardContent>
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsivePieCanvas
                        data={dataChart}
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


