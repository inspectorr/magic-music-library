import React, { useRef } from 'react';
import MaterialTable from 'material-table';
import useRemote from '@/support/hooks/useRemote';
import request, { useApi } from '@/support/utils/request';
import Select from 'react-select';

export function useAdminControlTableApi(path) {
  const { data, mutate: reload } = useApi(path);
  
  const {
    request: update
  } = useRemote(({ id, ...data }) => {
    return request({
      url: `${path}/${id}`,
      method: 'PUT',
      data
    });
  }, {
    onSuccess: () => reload()
  });
  
  const {
    request: create
  } = useRemote((data) => {
    return request({
      url: `${path}`,
      method: 'POST',
      data
    });
  }, {
    onSuccess: () => reload()
  });
  
  return {
    data,
    reload,
    update,
    create,
    path
  };
}

function AdminControlTable ({
  title = '',
  columns = [],
  data = [],
  reload = () => {},
  update = () => {},
  create = () => {},
  formatCreateData = (data) => data,
  formatUpdateData = (data) => data,
  detailPanel,
  ...props
}) {
  const tableRef = useRef();
  return (
    <MaterialTable
      tableRef={tableRef}
      options={{
        grouping: false,
        addRowPosition: 'first'
      }}
      columns={columns.map(({ type, ...column }) => {
        if (type === 'multiselect') {
          return {
            ...column,
            render: row => (
              <div>
                {row[column.field].map(i => i[column.multiselectOptions.mappingField]).join(', ')}
              </div>
            ),
            editComponent: (props) => (
              <SelectEditComponent
                isMulti
                remoteData={column.multiselectOptions.remoteData}
                {...props}
              />
            ),
          }
        } else if (type === 'select') {
          return {
            ...column,
            render: row => <div>{row[column.field]?.[column.selectOptions.mappingField]}</div>,
            editComponent: (props) => (
              <SelectEditComponent
                remoteData={column.selectOptions.remoteData}
                {...props}
              />
            ),
          };
        }
        
        return { type, ...column };
      })}
      title={title}
      data={data}
      editable={{
        onRowUpdate: (row) => update(formatUpdateData(row)),
        onRowAdd: (row) => create(formatCreateData(row))
      }}
      detailPanel={detailPanel}
      {...props}
    />
  );
}

function SelectEditComponent({
  remoteData = [],
  isMulti = false,
  value,
  onChange,
}) {
  return (
    <div className="table-multi-selector">
      <Select
        defaultValue={isMulti ? value?.map(({ id, name }) => {
          return { value: id, label: name };
        }) : { value: value?.id, label: value?.name }}
        isMulti={isMulti}
        name="colors"
        options={[
          ...(isMulti ? [] : [{ value: null, label: '🚫' }]),
          ...remoteData.map(({ id, name }) => {
            return { value: id, label: name };
          }),
        ]}
        classNamePrefix={isMulti ? 'multiselect' : 'select'}
        onChange={(selected, ...args) => {
          onChange(
            isMulti ? selected.map(v => v.value) : selected?.value,
            ...args
          );
        }}
      />
    </div>
  );
}


export default AdminControlTable;
