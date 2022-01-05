import React, { useState, useEffect, useCallback } from 'react';
import {useVersion, useDataProvider, usePermissions, useRefresh} from 'react-admin';
import {useMediaQuery, Theme} from '@material-ui/core';
import { format, subDays, addDays ,isToday} from 'date-fns';
import OrderChart30Day from "./OrderChart30Day";
import PendingOrders from "./PendingOrders";
import OrdersPayment from "./OrderPayment";
import {OrdersChartMonth} from "./OrdersChartMonth";
import {RoomChart} from "./RoomChart";
import * as _ from "lodash";
import SockJsClient from "react-stomp";
import {RevenueMonthTheater} from "./RevenueMonthTheater";
import {DivRevenueChart} from "./DivRevenueChart";
import {MovieRevenue} from "./MovieRevenue";
import {RevenueMovieByTheater} from "./RevenueMovieByTheater";
import {RevenueMovieByRoom} from "./RevenueMovieByRoom";
import RevenueToDayChart from "./RevenueToDayChart";
import RevenuePerStaff from "./RevenuePerStaff";
import RevenuePerTheater from "./RevenuePerTheater";
import {RoomRevenueToDay} from "./RoomRevenueToDay";
import {RoomCoverChart} from "./RoomCoverChart";
import {PercentPaymentMethod} from "./PercentPaymentMethod";
import TrackingActive from "./TrackingActive";
import {RevenueConcession} from "./RevenueConcession";



const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' ,alignItems:"center",alignContent:"center"},
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em',alignItems:"center",alignContent:"center" },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
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
    useEffect(() => {
        setArrPermission(permissions);
    },[permissions])


    const processOrdersToDay = (order) =>{
        return order
            .filter((order) => isToday(new Date(order.createdDate)))
            .reduce(
                (stats, order) => {
                    if (order.status === 'payment') {
                        stats.revenue += order.total;
                        stats.paymentOrdersToDay++;
                    }
                    if (order.status === 'non_payment' || order.status === "ordered") {
                        stats.pendingPaymentToDay++;
                    }
                    if (order.status === 'cancelled') {
                        stats.cancelledOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    pendingPaymentToDay: 0,
                    nbNewPaymentOrders:0,
                    paymentOrdersToDay: 0,
                    cancelledOrders:[]
                }
            );
    }

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);

        const { data: ordersAll } = await dataProvider.getList(
            'orders-room',
            {
                filter: {} ,
                sort: { field: 'id', order: 'DESC' },
                pagination: { page: 1, perPage: 1000000 },
            }
        );

        const { data: recentOrders } = await dataProvider.getList(
            'orders-room',
                {
                    filter: { date_gte: format(new Date(aMonthAgo),"yyyy-MM-dd") },
                    sort: { field: 'id', order: 'DESC' },
                    pagination: { page: 1, perPage: 1000000 },
                }
        );

        const {data: dataTheater} = await dataProvider.getList("theaters",
            {
                filter: {},
                sort: { field: 'id', order: 'DESC' },
                pagination: { page: 1, perPage: 1000000 },
            }
        );



        const aggregations = processOrdersToDay(recentOrders);

        setState(state => ({
            ...state,
            ordersAll,
            recentOrders,
            dataTheater,
            revenueToday: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'vnd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingPaymentToDay: aggregations.pendingPaymentToDay,
            paymentOrdersToDay:aggregations.paymentOrdersToDay,
            ordered:aggregations.ordered,
            revenueToDay:0
        }));

    }, [dataProvider]);



    useEffect(() => {
        fetchOrders();
    }, [version]);

    const {
        ordersAll,recentOrders,pendingPaymentToDay,paymentOrdersToDay,dataTheater,revenueToday
    } = state;

    const refresh = useRefresh();


    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        if(msg && msg.payload && msg.domain === "order"){
            const aggregations = processOrdersToDay(msg.payload[0]);

            setState(state => ({
                ...state,
                ordersAll:msg.payload[1],
                recentOrders:msg.payload[0],
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
        }
    }


    return isXSmall ? (
        <div>
            <div style={styles.flexColumn }>

            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn }>
            <div style={styles.singleCol}>
                {/*<Welcome />*/}
            </div>
            <div style={styles.flex}>
            </div>
            <div style={styles.singleCol}>
            </div>
            <div style={styles.singleCol}>
            </div>
        </div>
    ) : (
        <>
            <SockJsClient
                url={'http://localhost:8080/real-time-service/'}
                topics={['/topic/notification']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />

            {

                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.flex}>

                            {
                                isHavePermission("READ_CHART_STAFF") && <RevenueToDayChart value={revenueToday}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <RevenueToDayChart value={revenueToday}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <RevenueToDayChart value={revenueToday}/>
                            }
                            <Spacer />
                            <Spacer />
                            {
                                isHavePermission("READ_CHART_STAFF") && <PendingOrders value={pendingPaymentToDay} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <PendingOrders value={pendingPaymentToDay} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <PendingOrders value={pendingPaymentToDay} role={1}/>
                            }
                            <Spacer />
                            {
                                isHavePermission("READ_CHART_STAFF") && <OrdersPayment value={paymentOrdersToDay} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <OrdersPayment value={paymentOrdersToDay} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <OrdersPayment value={pendingPaymentToDay} role={1}/>
                            }

                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_USER_ACTIVE") && ordersAll && <TrackingActive />
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_STAFF") && recentOrders && <OrderChart30Day orders={recentOrders} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER")  && recentOrders && <OrderChart30Day orders={recentOrders} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER")  && recentOrders && <OrderChart30Day orders={recentOrders} role={1}/>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        recentOrders && <RevenuePerTheater orders={recentOrders}/>
                                    }
                                </div>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            <div style={{display:"flex"}}>
                                <div style={{marginRight:"15px",flex:1}}>
                                    {
                                        isHavePermission("READ_CHART_MANAGER")  && <RevenuePerStaff />

                                    }
                                </div>
                                {/*<div style={{flex:1}}>*/}
                                {/*    {*/}
                                {/*        isHavePermission("READ_CHART_MANAGER")  && <OrderListToDay/>*/}

                                {/*    }*/}
                                {/*</div>*/}

                            </div>

                        </div>


                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_STAFF") && ordersAll && <OrdersChartMonth  role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && ordersAll && <OrdersChartMonth   role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER")&& ordersAll && <OrdersChartMonth  role={1}/>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") && <RevenueConcession  role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <RevenueConcession  role={1}/>
                            }
                        </div>


                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <DivRevenueChart orders={ordersAll}  orders={ordersAll} role={3}/>
                                    }
                                </div>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <DivRevenueChart orders={ordersAll} role={1}/>
                                    }
                                </div>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && dataTheater && <RevenueMovieByTheater orders={ordersAll} dataTheater={dataTheater} role={1}/>
                                    }
                                </div>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <RevenueMovieByRoom orders={ordersAll}  role={2}/>
                                    }
                                </div>
                            }
                        </div>


                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <MovieRevenue orders={ordersAll } role={2}/>
                                    }
                                </div>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <MovieRevenue orders={ordersAll} role={1}/>
                                    }
                                </div>
                            }
                        </div>

                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                         <RoomCoverChart />
                                    }
                                </div>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        <RoomRevenueToDay />
                                    }
                                </div>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        <RoomChart />
                                    }
                                </div>
                            }
                        </div>

                        {
                            isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                            <div style={styles.singleCol}>
                                {
                                    <PercentPaymentMethod/>
                                }
                            </div>
                        }

                        {
                            isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                            <div style={styles.singleCol}>
                                {
                                    recentOrders && <RevenueMonthTheater orders={recentOrders}/>
                                }
                            </div>
                        }

                    </div>

                </div>
            }

        </>
    );
};


export default Dashboard;
