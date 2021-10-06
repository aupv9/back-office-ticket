import './App.css';
import {Admin, EditGuesser, ListGuesser, Resource,Create,SimpleForm,ReferenceInput,SelectInput,TextInput} from 'react-admin';
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
import {SeatCreate} from "./page/seat/SeatCreate";
import {Route} from "react-router-dom";
// import jsonServerProvider from 'ra-data-json-server';
//
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');




 const dataProvider = customRequest(`http://localhost:8080/api/v1`);

// const dataProvider = customNewRequest(`http://localhost:8080/api/v1`);



const App = () => {

    return (
        <Admin dataProvider={dataProvider} dashboard={DashBoard} authProvider={authProvider} >
            <Resource name="locations" list={Location} edit={LocationEdit} create={LocationCreate}/>
            <Resource name="theaters" list={TheaterList} edit={EditTheater} create={TheaterCreate}/>
            <Resource name="rooms"  list={ListRoom} edit={RoomEdit} create={RoomCreate}/>
            <Resource name="seats" create={SeatCreate}/>
            {/*<Resource name="users" list={ListGuesser} create={PostCreate} />*/}

        </Admin>
    );
}

// export const PostCreate = props => (
//         <Create {...props}>
//                 <SimpleForm>
//                     <ReferenceInput source="userId" reference="users">
//                         <SelectInput optionText="name" />
//                     </ReferenceInput>
//                     <TextInput source="title" />
//                     <TextInput multiline source="body" />
//                 </SimpleForm>
//             </Create>
// );

export default App;
