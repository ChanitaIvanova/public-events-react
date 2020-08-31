import { reduxForm } from "redux-form";
const withFormName = (name: string): any => {
    return reduxForm({
        // a unique name for the form
        form: name,
    });
};

export default withFormName;
