import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import {useMediaQuery, Theme} from '@material-ui/core';
import { format, subDays, addDays } from 'date-fns';
import {Area, CartesianGrid, XAxis, YAxis, AreaChart, ResponsiveContainer, Legend, Line,LineChart,Tooltip} from "recharts";
import OrderChart from "./OrderChart";




const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
    const [state, setState] = useState({});
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('md')
    );

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const { data: recentOrders } = await dataProvider.getList(
            'my-orders',
                {
                    filter: { date_gte: aMonthAgo.toISOString() },
                    sort: { field: 'id', order: 'DESC' },
                    pagination: { page: 1, perPage: 10000 },
                }
        );
        const aggregations = recentOrders
            .filter(order => order.status !== 'cancelled')
            .reduce(
                (stats, order) => {
                    if (order.status !== 'cancelled') {
                        stats.revenue += order.total;
                        stats.nbNewOrders++;
                    }
                    if (order.status === 'ordered') {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
                    pendingOrders: [],
                }
            );
        setState(state => ({
            ...state,
            recentOrders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
        }));
        // const { data: customers } = await dataProvider.getMany<Customer>(
        //     'customers',
        //         {
        //             ids: aggregations.pendingOrders.map(
        //                 (order) => order.customer_id
        //             ),
        //         }
        // );
        // setState(state => ({
        //     ...state,
        //     pendingOrdersCustomers: customers.reduce(
        //         (prev, customer) => {
        //             prev[customer.id] = customer; // eslint-disable-line no-param-reassign
        //             return prev;
        //         },
        //         {}
        //     ),
        // }));
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
        recentOrders
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
                <OrderChart orders={recentOrders} />


            </div>
            <div style={styles.singleCol}>
                {/*<PendingOrders*/}
                {/*    orders={pendingOrders}*/}
                {/*    customers={pendingOrdersCustomers}*/}
                {/*/>*/}
            </div>
        </div>
    ) : (
        <>
            {/*<Welcome />*/}
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        {/*<MonthlyRevenue value={revenue} />*/}
                        {/*<Spacer />*/}
                        {/*<NbNewOrders value={nbNewOrders} />*/}
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={recentOrders} />


                    </div>
                    <div style={styles.singleCol}>
                        {/*<PendingOrders*/}
                        {/*    orders={pendingOrders}*/}
                        {/*    customers={pendingOrdersCustomers}*/}
                        {/*/>*/}
                    </div>
                </div>
                <div style={styles.rightCol}>
                    <div style={styles.flex}>
                        {/*<PendingReviews*/}
                        {/*    nb={nbPendingReviews}*/}
                        {/*    reviews={pendingReviews}*/}
                        {/*    customers={pendingReviewsCustomers}*/}
                        {/*/>*/}
                        {/*<Spacer />*/}
                        {/*<NewCustomers />*/}
                    </div>
                </div>
            </div>
        </>
    );
};


export default Dashboard;
