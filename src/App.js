import './App.css';
import {
    Admin,
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

// import jsonServerProvider from 'ra-data-json-server';
//
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');




 const dataProvider = customRequest(`http://localhost:8080/api/v1`);

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
        <Admin dataProvider={dataProvider} dashboard={DashBoard} authProvider={authProvider} customRoutes={routes}>
            {/*<Resource name="locations" list={Location} edit={LocationEdit} create={LocationCreate}/>*/}
            <Resource name="theaters" list={TheaterList} edit={EditTheater} create={TheaterCreate}/>
            <Resource name="rooms"  list={ListRoom} edit={RoomEdit} create={RoomCreate}/>
            <Resource name="seats" edit={SeatEdit} create={localStorage.getItem("idRoom") ? SeatCreateDialog :null}  />
            <Resource name="locations" list={LocationList} show={LocationShow} edit={LocationEdit} create={LocationCreate}/>
            <Resource name="location-theater"/>
            <Resource name={"movies"} list={MovieList} />
            <Resource name={"show-times"} list={ShowTimesList} show={ShowTimesShow}  options={{ label: 'Show Times' }}/>
            <Resource name={"showTimesDetails"} />
            <Resource name={"count-showTimesDetails"} />

        </Admin>
    );
}


export default App;
