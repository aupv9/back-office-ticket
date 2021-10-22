import './App.css';
import {
    Admin, EditGuesser, fetchUtils, ListGuesser,
    Resource, ShowGuesser
} from 'react-admin';
import {Location} from "./page/location/Location";
import customRequest from "./customRequest";
import DashBoard from "./DashBoard";
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
import OrdersCreate from "./page/orders/OrdersCreate";
import {UserCreate} from "./page/user/UserCreate";
import {UserList} from "./page/user/UserList";
import UserEdit from "./page/user/UserEdit";
import MyLoginPage from "./page/login/MyLoginPage";
import {EmployeeList} from "./page/employee/EmployeeList";

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

// const dataProvider = customNewRequest(`http://localhost:8080/api/v1`);

const routes =  [
    <Route exact path="/seats" >
        {
            localStorage.getItem("idRoom") ? <Redirect to={`rooms/${parseInt(localStorage.getItem("idRoom"))}/seats`} />
                :
                <Redirect to={`rooms`} />
        }
    </Route>


 ]



const App = () => {
    return (
        <Admin dataProvider={dataProvider}
               dashboard={DashBoard}
               authProvider={authProvider}
               customRoutes={routes}
               layout={Layout}
               // loginPage={MyLoginPage}
        >
            {/*<Resource name="locations" list={Location} edit={LocationEdit} create={LocationCreate}/>*/}
            <Resource name="theaters" list={TheaterList} edit={EditTheater} create={TheaterCreate}/>
            <Resource name="rooms"  list={ListRoom} edit={RoomEdit} create={RoomCreate}/>
            <Resource name="seats" edit={SeatEdit} create={localStorage.getItem("idRoom") ? SeatCreateDialog :null}  />
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
            <Resource name="orders" list={OrdersList} create={OrdersCreate}/>
            <Resource name="users" create={UserCreate} list={UserList} edit={UserEdit} show={ShowGuesser}/>
            <Resource name="roles" />
            <Resource name={"uas"} />
            <Resource name="employees" list={EmployeeList}/>

        </Admin>
    );
}


export default App;
