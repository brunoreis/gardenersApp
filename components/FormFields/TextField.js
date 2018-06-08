import React from 'react';
import TextFieldComponent from './TextFieldComponent';

export default ( field, label, placeholder, data, onChange, errors, isPassword = false ) => {
    console.log('errors', errors);
    return (
        <TextFieldComponent
            label={label}
            errors={errors}
            value={data[field]}
            placeholder={placeholder}
            isPassword={isPassword}
            onChange={(value) => onChange({ field, value })}
        />
    )
}
