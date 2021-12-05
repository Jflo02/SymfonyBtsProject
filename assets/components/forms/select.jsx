import React from 'react';

const Select = (name, value, label, onChange, children) => {
    return (
        <div className="form-group">
            <label htmlFor={service}>{label}</label>
            <select onChange={onChange} name={service} id={service} value={value} className="form-control">
                {children}
            </select>
            
        </div>
    );
}

export default Select; props