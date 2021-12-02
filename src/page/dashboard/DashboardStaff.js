import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import {useVersion, useDataProvider, usePermissions} from 'react-admin';
import {useMediaQuery, Theme} from '@material-ui/core';
import { format, subDays, addDays } from 'date-fns';
import {Area, CartesianGrid, XAxis, YAxis, AreaChart, ResponsiveContainer, Legend, Line,LineChart,Tooltip} from "recharts";
import OrderChart30Day from "./OrderChart30Day";
import MonthlyRevenue from "./MonthlyRevenue";
import PendingOrders from "./PendingOrders";
import CustomerCount from "./CustomerCount";
import OrdersPayment from "./OrderPayment";
import {OrdersChartMonth} from "./OrdersChartMonth";
import {RoomChart} from "./RoomChart";
import * as _ from "lodash";




const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' ,alignItems:"center",alignContent:"center"},
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em',alignItems:"center",alignContent:"center" },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const DashboardStaff = () => {
    const { loaded, permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const [state, setState] = useState({});
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('md')
    );
    const isHavePermission = (permission) =>{
        return _.includes(arrPermission,permission);
    }
    useEffect(() =>{
        setArrPermission(permissions);
    },[permissions])

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const { data: recentOrders } = await dataProvider.getList(
            'orders-room',
                {
                    filter: { date_gte: format(new Date(aMonthAgo),"yyyy-MM-dd") },
                    sort: { field: 'id', order: 'DESC' },
                    pagination: { page: 1, perPage: 10000 },
                }
        );
        const aggregations = recentOrders
            .reduce(
                (stats, order) => {
                    if (order.status === 'payment') {
                        stats.revenue += order.total;
                        stats.paymentOrders++;
                    }
                    if (order.status === 'non_payment') {
                        // stats.pendingPayment.push(order);
                        stats.pendingPayment++;
                    }
                    if (order.status === 'cancelled') {
                        stats.cancelledOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    pendingPayment: 0,
                    nbNewPaymentOrders:0,
                    paymentOrders: 0,
                    cancelledOrders:[]
                }
            );
        setState(state => ({
            ...state,
            recentOrders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'vnd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingPayment: aggregations.pendingPayment,
            paymentOrders:aggregations.paymentOrders
        }));



        // const { data: customers } = await dataProvider.getMany<Customer>(
        //     'customers',
        //         {
        //             ids: aggregations.pendingOrders.map(
        //                 (order) => order.customer_id
        //             ),
        //         }
        // );

    }, [dataProvider]);

    useEffect(() => {
        fetchOrders();
    }, [version]);
    // useEffect(() =>{
    //     if(state.recentOrders){
    //         state.recentOrders
    //             .forEach((acc, curr) => {
    //                 const createdDate = new Date(acc.createdDate);
    //                 const day = format(createdDate, 'yyyy-MM-dd');
    //                 console.log(day);
    //             });
    //     }
    //
    //
    // },[state])

    const {
        recentOrders,revenue,pendingPayment,paymentOrders,ordersRoom
    } = state;

    return isXSmall ? (
        <div>
            <div style={styles.flexColumn }>
                {/*<Welcome />*/}
                {/*<MonthlyRevenue value={revenue} />*/}
                {/*<VerticalSpacer />*/}
                {/*<NbNewOrders value={nbNewOrders} />*/}
                {/*<VerticalSpacer />*/}
                {/*<PendingOrders*/}
                {/*    orders={pendingOrders}*/}
                {/*    customers={pendingOrdersCustomers}*/}
                {/*/>*/}
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn }>
            <div style={styles.singleCol}>
                {/*<Welcome />*/}
            </div>
            <div style={styles.flex}>
                {/*<MonthlyRevenue value={revenue} />*/}
                {/*<Spacer />*/}
                {/*<NbNewOrders value={nbNewOrders} />*/}
            </div>
            <div style={styles.singleCol}>
                {/*<OrderChart30Day orders={recentOrders} />*/}
            </div>
            <div style={styles.singleCol}>
                {/*<OrdersChartMonth />*/}
            </div>
        </div>
    ) : (
        <>

            {/*<div style={styles.flex}>*/}
            {/*    <div style={styles.leftCol}>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*            <OrderChart30Day orders={recentOrders} />*/}
            {/*        </div>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div style={styles.rightCol}>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*            <OrdersChartMonth />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={styles.flex}>*/}
            {/*    <div style={styles.leftCol}>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*            {*/}
            {/*                recentOrders ? <RoomChart orders={recentOrders}/> : null*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div style={styles.rightCol}>*/}
            {/*        <div style={styles.singleCol}>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {

                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.flex}>
                            {
                                isHavePermission("READ_CHART_STAFF") && <MonthlyRevenue value={revenue} />
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <MonthlyRevenue value={revenue} />
                            }
                            <Spacer />
                            {
                                isHavePermission("READ_CHART_STAFF") &&<PendingOrders value={pendingPayment}/>
                            }
                            <Spacer />
                            {
                                isHavePermission("READ_CHART_STAFF") && <OrdersPayment value={paymentOrders}/>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_STAFF") && <OrderChart30Day orders={recentOrders} />
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <OrderChart30Day orders={recentOrders} />
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_STAFF") && <OrdersChartMonth />
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <OrdersChartMonth />
                            }
                        </div>
                        {
                            isHavePermission("READ_CHART_MANAGER") &&
                            <div style={styles.singleCol}>
                                {
                                    recentOrders && <RoomChart orders={recentOrders}/>
                                }
                            </div>
                        }

                    </div>

                </div>
            }

        </>
    );
};


export default DashboardStaff;
