import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import {useDataProvider, useGetList, useTranslate} from 'react-admin';
import { format, subDays, addDays } from 'date-fns';
import { ResponsivePieCanvas } from '@nivo/pie'
import {useCallback, useEffect, useState} from "react";

const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date) => new Date(date).toLocaleDateString();


export const RevenueMonthTheater = (props) => {
    const { orders } = props;
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const {data,ids,loaded} = useGetList("theaters", { page: 1, perPage: 10000 });
    const [theaters,setTheater] = useState([]);
    const [dataChart,setDataChart] = useState([]);


    useEffect(() =>{
        const theaters = ids.map(id => data[id]);
        setTheater(theaters);
        const aggregateOrdersByTheaters= (orders) =>
            orders
                .filter((order) => order.status !== 'cancelled' && order.status !== 'non_payment')
                .reduce((acc, curr) => {
                    const room = curr["theaterName"];
                    if (!acc[room]) {
                        acc[room] = 0;
                    }
                    acc[room] += curr.total;
                    return acc;
                }, {});

        const getRevenuePerTheater = (orders) => {
            const theatersWithRevenue = aggregateOrdersByTheaters(orders);
            return theaters.map(theater => ({
                id: theater["name"],
                label:theater["name"],
                value: theatersWithRevenue[theater["name"]] || 0

            }));
        };
        setDataChart(getRevenuePerTheater(orders));
    },[ids,data]);

    if (!orders) return null;



    return (
        <Card>
            <CardHeader title={translate('30 Day Revenue History All Theater    ')} />
            <CardContent>
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsivePieCanvas
                        data={dataChart}
                        margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
                        valueFormat=" >-0,~r"
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


