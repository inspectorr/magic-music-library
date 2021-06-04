import React from 'react';

function DataBlock({
  data = {},
  map = {},
  handleMap = {},
  nameProp = 'name',
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
          const handled = (
            typeof value === 'string' || typeof value === 'number'
              ? value
              : (handleMap?.[key] ?? ((row) => row?.name))?.(value)
          );
          
          if (!handled) return;
          
          return (
            <div key={key} className="data-block__entity">
              <span>{title}</span>: {handled}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataBlock;
