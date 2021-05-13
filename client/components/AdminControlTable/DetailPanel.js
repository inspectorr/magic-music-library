import AdminControlTable from '@/components/AdminControlTable/AdminControlTable';
import React, { useEffect } from 'react';

export function DetailPanel({
  onUnmount,
  children
}) {
  useEffect(() => {
    return () => {
      onUnmount();
    }
  }, [onUnmount]);
  
  return (
    <div className="admin__detail-panel">
      {children}
    </div>
  );
}

// example usage:
// detailPanel={(song) => (
//   <DetailPanel
//     onUnmount={() => adminControlTableApi.reload()}
//   >
//     <DetailPicker
//       label="Genres"
//       name="genres"
//     >
//       <GenrePicker
//         defaultSelected={song.genres}
//         updateForSongId={song.id}
//       />
//     </DetailPicker>
//   </DetailPanel>
// )}

export function DetailPicker({
  name = '',
  label = '',
  children
}) {
  return (
    <div className="admin__details-picker">
      {label && <label>{label}</label>}
      
      <div className="admin__details-picker-field">
        {children}
      </div>
    </div>
  );
}
