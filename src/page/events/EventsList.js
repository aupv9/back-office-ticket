import * as React from "react";
import {List, Datagrid, TextField, DateField, BooleanField, ChipField} from 'react-admin';
import {format} from "date-fns";



export const EventsList = (props) => (
    <List {...props}
          filterDefaultValues={{date:format(new Date(),"yyyy-MM-dd")}}
    >
        <Datagrid>
            <TextField source="name" />
            <TextField source="resourceName" />
            <TextField source="accountName" />
            <TextField source="objectName" />
            <DateField source={"actionDate"} showTime/>
            <ChipField source="actionStatus" />
        </Datagrid>
    </List>
);
