import {Edit, SimpleForm, TextInput, Create, SectionTitle, required, useTranslate} from "react-admin";
import * as React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";



export const styles = {
    name: { display: 'block' },
    zipcode: { display: 'block' },
    title:{
        fontWeight:'bold'
    }
};

const useStyles = makeStyles(styles);

export const LocationCreate = props => {
    const classes = useStyles(props);

    return (
        <Create {...props}>
            <SimpleForm>
                <Typography variant="h6" gutterBottom classes={classes.title}>
                    {"Location Name"}
                </Typography>
                <TextInput
                    source="name"
                    formClassName={classes.name}
                    validate={requiredValidate}
                />

                <TextInput
                    source="zipcode"
                    formClassName={classes.zipcode}
                    helperText={false}
                    validate={requiredValidate}
                />

            </SimpleForm>
        </Create>
        );

};



const requiredValidate = [required()];
