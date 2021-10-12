import * as React from "react";
import {
    TabbedShowLayout,
    Tab,
    Show,
    ReferenceField,
    TextField,
    DateField,
    useRecordContext, useGetOne, useGetList, useShowContext
} from 'react-admin'


export const ShowTimesShow = (props) => {

    return (
        <Show {...props} >
            <ShowTimesContent />
        </Show>
    )
}

const ShowTimesContent = () =>{
    const { record } = useShowContext();
    console.log(record)
    const { data, ids, total, loading, loaded, error } = useGetList("seats-AvaiableInRoom", { page: 1, perPage: 10 },
        { field: 'id', order: 'DESC' }, {   showTimesId:record.id,
            room:record.roomId},{

    });
    return(
        <TabbedShowLayout>
            <Tab label="summary">
                <ReferenceField
                    source="movieId"
                    reference="movies"
                >
                    <TextField source="name" label="Movie Name"/>
                </ReferenceField>
                <ReferenceField
                    source="roomId"
                    reference="rooms"
                >
                    <TextField source="name" label="Room Name"/>
                </ReferenceField>
                <DateField label="Day Show Time" source="date"  locales="VN"  options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric'}}/>
                <TextField source="timeStart" label="Time"/>
            </Tab>
            <Tab label="Seat In Room" path="seats">
                {/*<TextField label="Password (if protected post)" source="password" type="password" />*/}
                {/*<DateField label="Publication date" source="published_at" />*/}
                {/*<NumberField source="average_note" />*/}
                {/*<BooleanField label="Allow comments?" source="commentable" defaultValue />*/}
                {/*<TextField label="Nb views" source="views" />*/}
                {/*<ReferenceField reference="seats-AvaiableInRoom" source="" >*/}

                {/*</ReferenceField>*/}
            </Tab>

        </TabbedShowLayout>
    )
}





