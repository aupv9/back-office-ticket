import * as React from "react";
import {Show, TabbedShowLayout, TextField, Tab, ReferenceManyField, ChipField, Datagrid} from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';
import {Box, Button} from "@material-ui/core";





export const RoleShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField label="Name" source="code" />

            </Tab>
            <Tab label="Privilege" path="privilege">
                {/*<Button variant={"contained"}>Add <Button/>*/}
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button>
                        Add
                    </Button>
                </Box>

                <ReferenceManyField reference={"privilege-role"} target={"id"} label={""}>
                    <Datagrid {...props}>
                        <TextField source={"id"} />
                        <ChipField source={"name"} />
                    </Datagrid>
                </ReferenceManyField>

            </Tab>

        </TabbedShowLayout>
    </Show>
);
