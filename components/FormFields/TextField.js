import React from 'react';
import TextFieldComponent from './TextFieldComponent';

export default ( field, label, placeholder, data, onChange, errors, isMultiline = false, isPassword = false ) => {
    return (
        <TextFieldComponent
            label={label}
            errors={errors}
            value={data[field]}
            placeholder={placeholder}
            isPassword={isPassword}
            isMultiline={isMultiline}
            onChange={(value) => onChange({ field, value })}
        />
    )
}
