import './App.css';
import {
    Admin, fetchUtils, ListGuesser, Login,
    Resource, ShowGuesser, usePermissions
} from 'react-admin';
import customRequest from "./customRequest";
import authProvider from "./authProvider";
import {LocationEdit} from "./page/location/LocaitonEdit";
import {LocationCreate} from "./page/location/LocationCreate";
import TheaterList from "./page/theater/TheaterList";
import EditTheater from "./page/theater/EditTheater";
import TheaterCreate from "./page/theater/TheaterCreate";
import {ListRoom} from "./page/room/ListRoom";
import RoomEdit from "./page/room/RoomEdit";
import RoomCreate from "./page/room/RoomCreate";
import {Redirect, Route} from "react-router-dom";
import {SeatCreateDialog} from "./page/seat/SeatCreateDialog";
import {SeatEdit} from "./page/seat/SeatEdit";
import {LocationList} from "./page/location/LocationList";
import {LocationShow} from "./page/location/LocationShow";
import MovieList from "./page/movie/MovieList";
import {ShowTimesList} from "./page/showtimes/ShowTimesList";
import {ShowTimesShow} from "./page/showtimes/ShowTimesShow";
import {ShowTimesCreate} from "./page/showtimes/ShowTimesCreate";
import {ShowTimesEdit} from "./page/showtimes/ShowTimesEdit";
import CategoryList from "./page/category/CategoryList";
import ConcessionList from "./page/foods/ConcessionList";
import CategoryEdit from "./page/category/CategoryEdit";
import {CategoryCreate} from "./page/category/CategoryCreate";
import {ConcessionCreate} from "./page/foods/ConcessionCreate";
import OrdersList from "./page/orders/OrdersList";
import Layout from "./page/layout/Layout";
import {UserCreate} from "./page/user/UserCreate";
import UserEdit from "./page/user/UserEdit";
import {EmployeeList} from "./page/employee/EmployeeList";
import EmployeeEdit from "./page/employee/EmployeeEdit";
import LoginForm from "./page/login/LoginForm";
import UserList from "./page/user/UserList";
import {ShowList} from "./page/ticket/ShowList";
import {ShowEdit} from "./page/ticket/ShowEdit";
import {MyOrder} from "./page/my-order/MyOrder";
import OrderEdit from "./page/my-order/MyOrderEdit";
import {PaymentCreate} from "./page/payment/PaymentCreate";
import {PaymentList} from "./page/payment/PaymentList";
import {OfferList} from "./page/offer/OfferList";
import {OfferCreate} from "./page/offer/OfferCreate";
import {createMuiTheme} from "@material-ui/core";
import {theme} from "./theme";
import {RoleList} from "./page/role/RoleList";
import {RoleShow} from "./page/role/RoleShow";
import {OfferHistoryList} from "./page/offer/OfferHistoryList";
import {OfferShow} from "./page/offer/OfferShow";
import DashboardStaff from "./page/dashboard/DashboardStaff";
import {RoomChart} from "./page/dashboard/RoomChart";
import {ServiceList} from "./page/service/ServiceList";
import {ServiceCreate} from "./page/service/ServiceCreate";
import {SeatList} from "./page/seat/SeatList";
import RoleEdit from "./page/role/RoleEdit";
import {RoleCreate} from "./page/role/RoleCreate";
import {useEffect, useState} from "react";
import * as _ from 'lodash';

// import jsonServerProvider from 'ra-data-json-server';
//
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');



const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const  token  = JSON.parse(localStorage.getItem('token'));
    options.headers.set('Authorization', `${token}`);
    return fetchUtils.fetchJson(url, options);
};


const dataProvider = customRequest(`http://localhost:8080/api/v1`,httpClient);


const customProvider = {
    ...dataProvider,

    updateMany: async (resource, params) => {
        const items = params.data;
        const idsToUpdate = params.ids;
        console.log(items)

        // Handle update many here
    }
}

// if (type === "updateManyArray") {
//     return Promise.all(
//         params.ids.map(id =>
//             httpClient(`${apiUrl}/${resource}/${id}`, {
//                 method: "PUT",
//                 body: JSON.stringify(params.data)
//             })
//         )
//     ).then(responses => ({
//         data: responses.map(response => response.json)
//     }));
// }
//
// if (type === "createMany") {
//     return Promise.all(
//         params.ids.map(id =>
//             httpClient(`${apiUrl}/${resource}`, {
//                 method: "POST",
//                 body: JSON.stringify(params.data)
//             })
//         )
//     ).then(responses => ({
//         data: responses.map(response => response.json)
//     }));
// }


// const dataProvider = customNewRequest(`http://localhost:8080/api/v1`);

const routes =  [
    // <Route exact path="/dashboard-default" component={DashboardStaff} />,
    // <Route exact path="/statistics-room" component={RoomChart} />,
    <Route exact path="/profile" component={RoomChart} />,

]


const MyLoginPage = () => (
    <Login
        backgroundImage="https://source.unsplash.com/random/1600x900/daily">
        <LoginForm/>
    </Login>
);

// const theme = createMuiTheme({
//     palette: {
//         type: 'light', // Switching the dark mode on is a single property value change.
//     },
// });

const App = () => {



    return (
        <Admin dataProvider={dataProvider}
               dashboard={DashboardStaff}
               authProvider={authProvider}
               customRoutes={routes}
               layout={Layout}
                loginPage={MyLoginPage}
               theme={theme}
        >
            {/*<Resource name="locations" list={Location} edit={LocationEdit} create={LocationCreate}/>*/}
            <Resource name="theaters" list={TheaterList} edit={EditTheater} create={TheaterCreate}/>
            <Resource name="rooms"  list={ListRoom} edit={RoomEdit} create={RoomCreate}/>
            <Resource name="seats" edit={SeatEdit} create={ SeatCreateDialog } list={SeatList} />
            <Resource name="locations" list={LocationList} show={LocationShow} edit={LocationEdit} create={LocationCreate}/>
            <Resource name="location-theater"/>
            <Resource name={"movies"} list={MovieList} />
            <Resource name={"showTimesDetails"} list={ShowTimesList} show={ShowTimesShow}  edit={ShowTimesEdit} create={ShowTimesCreate}
                      options={{ label: 'Show Times' }} />
            <Resource name={"count-showTimesDetails"} />
            <Resource name={"timeShowTimes"}/>
            <Resource name="seats-AvaiableInRoom" />
            <Resource name="seats-room" />
            <Resource name="categories" options={{label:'Category'}} list={CategoryList} edit={CategoryEdit} create={CategoryCreate}/>
            <Resource name="concessions" list={ConcessionList} create={ConcessionCreate}   options={{label:'Concessions'}} />
            <Resource name="orders" list={OrdersList} show={ShowGuesser}
                      // create={OrdersCreate}
            />
            <Resource name="my-orders" list={MyOrder} edit={OrderEdit} show={ShowGuesser}/>
            <Resource name="users" create={UserCreate} list={UserList} edit={UserEdit} show={ShowGuesser}/>
            <Resource name={"uas"} />
            <Resource name="employees" list={EmployeeList} edit={EmployeeEdit}/>
            <Resource name="shows"  list={ShowList}  edit={ShowEdit} />
            <Resource name="payments"  create={PaymentCreate} list={PaymentList}/>
            <Resource name="payments-method" />
            <Resource name={"paymentOrder"} />
            <Resource name={"offers"} list={OfferList} create={OfferCreate} show={OfferShow}/>
            <Resource name={"offers-history"} list={OfferHistoryList} />

            <Resource name="roles"
                      list={RoleList}
                      show={RoleShow}
                      edit={RoleEdit}
                      create={RoleCreate}
            />
            <Resource name="privilege-role" />
            <Resource name="privileges" />

            <Resource name="services" list={ServiceList} create={ServiceCreate}/>

        </Admin>
    );
}


export default App;
