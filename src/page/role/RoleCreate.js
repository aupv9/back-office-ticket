import {useCallback, useState} from "react";
import {useFormState} from "react-final-form";
import {
    ReferenceInput, SelectInput, Create,
    DateInput,
    TextInput,
    SimpleForm,
    required, SaveButton, Toolbar
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {PrivilegeReferenceInput} from "./PrivilegeReferenceInput";



const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});

// const PostCreateToolbar = props => (
//     <Toolbar {...props} >
//         <SaveButton
//             label="post.action.save_and_show"
//             redirect="show"
//             submitOnEnter={true}
//             disabled={props.pristine}
//         />
//     </Toolbar>
// );
//


export const RoleCreate = props => {

    // const location = useLocation();
    // const post_id =
    //     location.state && location.state.record
    //         ? location.state.record.post_id
    //         : undefined;
    // const redirect = post_id ? `/posts/${post_id}/show/comments` : false;

    return (
        <Create {...props} >
            <SimpleForm
                pristine={false}
            >
                <TextInput source={"name"} />
                <TextInput source={"code"} />
                <PrivilegeReferenceInput
                    source="privileges"
                    reference="privileges"
                    allowEmpty
                    // validate={required()}
                    perPage={10000}
                    sort={{field:"name",order:"ASC"}}
                />
            </SimpleForm>
        </Create>
    );
};




