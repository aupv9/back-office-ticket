import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Box, Link, useMediaQuery} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {useDataProvider, useGetList, usePermissions, useVersion} from 'react-admin';
import { startOfMonth, format } from 'date-fns';
import { ResponsiveBar } from '@nivo/bar';
import * as _ from "lodash";


const multiplier = {
    opportunity: 0.2,
    'proposal-sent': 0.5,
    'in-negociation': 0.8,
    delayed: 0.3,
};


export const OrdersChartMonth = ({theaterName}) => {
    const { permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);

    const isHavePermission = (permission) =>{
        return _.includes(arrPermission,permission);
    }
    useEffect(() =>{
        setArrPermission(permissions);
    },[permissions])

    const { data, ids, loaded } = useGetList(
        'my-orders',
        { perPage: 100, page: 1 },
        {
            field: 'id',
            order: 'ASC',
        }
    );

    const [months, setMonths] = useState([]);

    useEffect(() => {
        const orders = ids.map(id => data[id]);

        const ordersByMonth = orders.reduce((acc, order) => {
            const month = startOfMonth(new Date(order.createdDate)).toISOString();
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(order);
            return acc;
        }, {});

        const amountByMonth = Object.keys(ordersByMonth).map(month => {
            return {
                date: format(new Date(month), 'MMM'),
                pending: ordersByMonth[month]
                    .filter((order) => order.status === 'non_payment')
                    .reduce((acc, order) => {
                        acc += order.total;
                        return acc;
                    }, 0),
                payment: ordersByMonth[month]
                    .filter(
                        (order) => !['non_payment', 'cancelled'].includes(order.status)
                    )
                    .reduce((acc, order) => {
                        acc += order.total;
                        return acc;
                    }, 0),
                cancelled: ordersByMonth[month]
                    .filter((order) => order.status === 'cancelled')
                    .reduce((acc, order) => {
                        acc += order.total;
                        return acc;
                    }, 0),

            };
        });
        setMonths(amountByMonth);

    }, [ids, data]);
    console.log(months)
    if (!loaded) return null;

    const range = months.reduce(
        (acc, month) => {
            acc.min = Math.min(acc.min, month.cancelled);
            acc.max = Math.max(acc.max, month.payment + month.pending);
            return acc;
        },
        { min: 0, max: 0 }
    );

    return (
        <>
            <Box display="flex" alignItems="center">
                <Box ml={2} mr={2} display="flex">
                    <AttachMoneyIcon color="disabled" fontSize="large" />
                </Box>
                <Link
                    underline="none"
                    variant="h5"
                    color="textSecondary"
                >
                    Upcoming Revenue This Year
                </Link>
            </Box>
            <Box height={500}>
                <ResponsiveBar
                    data={months}
                    indexBy="date"
                    keys={['payment', 'pending', 'cancelled']}
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{
                        type: 'linear',
                        min: range.min * 1.2,
                        max: range.max * 1.2,
                    }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'dark2' }}
                    // defs={[
                    //     {
                    //         id: 'dots',
                    //         type: 'patternDots',
                    //         background: 'inherit',
                    //         color: '#38bcb2',
                    //         size: 4,
                    //         padding: 1,
                    //         stagger: true
                    //     },
                    //     {
                    //         id: 'lines',
                    //         type: 'patternLines',
                    //         background: 'inherit',
                    //         color: '#eed312',
                    //         rotation: -45,
                    //         lineWidth: 6,
                    //         spacing: 10
                    //     }
                    // ]}
                    // fill={[
                    //     {
                    //         match: {
                    //             id: 'fries'
                    //         },
                    //         id: 'dots'
                    //     },
                    //     {
                    //         match: {
                    //             id: 'sandwich'
                    //         },
                    //         id: 'lines'
                    //     }
                    // ]}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Month',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'right-to-left',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    role="application"
                    // barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
                />
            </Box>
        </>
    );
};
