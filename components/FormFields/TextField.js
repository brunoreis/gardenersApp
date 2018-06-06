import React from 'react';
import TextFieldComponent from './TextFieldComponent';

export default ( field, label, placeholder, data, onChange, errors, isPassword = false ) =>
    <TextFieldComponent
        label={label}
        errors={errors}
        value={data[field]}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChange={(value) => onChange({ field, value })}
    />
