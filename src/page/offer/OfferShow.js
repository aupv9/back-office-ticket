import * as React from "react";
import {
    TabbedShowLayout,
    Tab,
    Show,
    ReferenceField,
    TextField,
    DateField, useGetList, useShowContext, Datagrid, Pagination,ChipField,BooleanField,NumberField,Loading
} from 'react-admin'


export const OfferShow = (props) => {

    return (
        <Show {...props} >
            <OfferContent />
        </Show>
    )
}

const OfferContent = () =>{
    const { record } = useShowContext();
    console.log(record)
    return(

        <TabbedShowLayout>
            <Tab label="summary">

            </Tab>
            <Tab label="Seat In Room" path="seats">

            </Tab>

        </TabbedShowLayout>
    )
}





