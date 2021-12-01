import {useCallback, useState} from "react";
import {useFormState} from "react-final-form";
import {ReferenceArrayInput, SelectArrayInput} from "react-admin";
import PrivilegeQuickCreateButton from "./PrivilegeQuickCreateButton";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

const spySubscription = { values: true };

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});

export const PrivilegeReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);
    const { values } = useFormState({ subscription: spySubscription });
    const handleChange = useCallback(() => setVersion(version + 1), [version]);

    return (
        <div className={classes.root}>

            <ReferenceArrayInput key={version} {...props}>
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>

            <PrivilegeQuickCreateButton onChange={handleChange} />
            {/*{!!values.post_id && <PostQuickPreviewButton id={values.post_id} />}*/}
        </div>
    );
};
