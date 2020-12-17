import React from 'react';

function CheckBox({id,name,onChange,value,className}) {
    return (
        <>
        <input
                id={id}
                type="checkbox"
                className={className}
                value={name}
                onChange={(event) => onChange(event, value)}
              />
            
        </>
    );
}

export default CheckBox;