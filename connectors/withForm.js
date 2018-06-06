import React from 'react';
import R from 'ramda';


export default ( config ) => (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            if (!config.onSubmit) {
                throw new Error(
                    'You need to declare a "onSubmit" function (returns the function - run - used to submit the form).'
                )
            }

            if (!config.defaultData) {
                throw new Error(
                    'You need to declare the defaultData.'
                );
            }

            const data = config.defaultData(props);

            if (config.getInitialData && (typeof config.getInitialData === 'function')) {
                const initialData = config.getInitialData(props);

                R.map(
                    (key) => {
                        if (R.has(key, data)) {
                            data[key] = initialData[key];
                        }
                    }
                )(R.keys(initialData));
            }

            this.initialStateData = R.clone(data);
            this.state = { data };
        }

        reset() {
            this.setState({data:this.initialStateData});
        }

        componentWillReceiveProps(nextProps) {
            const { data } = this.state;
            const nextSubmit = config.onSubmit(nextProps);
            const submit = config.onSubmit(this.props);

            if (submit.success === false && nextSubmit.success === true && config.onSuccess) {
                config.onSuccess(data, nextProps);
            }
        }

        onChangeForm = ({ field, value }) => {
            const { data } = this.state;
            let dataToChange = R.clone(data);
            dataToChange[field] = value;
            this.setState( { data: dataToChange } );
        }

        onSubmit = () => {
            const submit = config.onSubmit(this.props);

            if ((typeof submit) !== 'object') {
                throw new Error('submit is not an object.');
            }
            if ((typeof submit.run) !== 'function') {
                throw new Error('submit.run is not a function.');
            }

            return submit;
        }


        submit = ({ extraInfo } = {}) => {
            let { data } = this.state;
            if (!!extraInfo) Object.assign(data,extraInfo);
            return this.onSubmit().run(data);
        }


        render() {
            const submitObj = this.onSubmit();
            const { data } = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    form = {{
                        data,
                        onChangeForm: this.onChangeForm,
                        submit: { ...submitObj, run: this.submit },
                        generalErrorMessage: submitObj.error ? submitObj.error.message : null,
                        getFieldErrorMessages: (fieldName) => {
                            if (submitObj.error && submitObj.error.state && submitObj.error.state[fieldName]) {
                                const errors = submitObj.error.state[fieldName];
                                return errors;
                            }

                            return [];
                        },
                        reset: () => this.reset()
                    }}
                />
            )
        }
    }
}
