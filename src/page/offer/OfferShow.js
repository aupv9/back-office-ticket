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
                <DateField source={"creationDate"} showTime/>
                <TextField source={"name"}/>
                <ChipField source={"method"} label={"Mode"}/>
                <ChipField source={"type"}/>
                <ChipField source={"status"}/>
                <NumberField
                    source="discountAmount"
                    options={{
                        style: 'currency',
                        currency: 'VND',
                    }}
                    label={"Amount"}
                />
                <TextField source={"percentage"} label={"%"}/>
            </Tab>
            <Tab label="Send User" path="send">

            </Tab>

        </TabbedShowLayout>
    )
}





