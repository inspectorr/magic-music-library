import React from 'react';

function DataBlock({
  data = {},
  map = {},
  nameProp = 'name',
  handleMap = {},
  mapping = (row) => row?.name,
  handleMapMulti = {},
}) {
  return (
    <div className="data-block">
      <div className="data-block__header">
        {data[nameProp]}
      </div>
      <div className="data-block__data">
        {Object.entries(map).map(([key, title]) => {
          if (key === nameProp) return null;
          const value = data[key];
          
          const func = handleMap?.[key] ?? mapping;
          const funcMulti = handleMapMulti?.[key];
          
          const handled = (
            typeof value === 'string' || typeof value === 'number' ?
              value :
            value instanceof Array ?
              funcMulti ?
                funcMulti(value) :
                value?.map(func).join(', ') :
  
              func(value)
          );
          
          if (!handled) return;
          
          return (
            <div key={key} className="data-block__entity">
              <b>{title}</b>: {handled}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataBlock;
