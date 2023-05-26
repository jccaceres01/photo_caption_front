import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Loading = ({size = 14, show = false}) => {
  if (show) {
    return (
      <div className="p-0">
        <FontAwesomeIcon spin className="text-rose-500" style={{fontSize: size || 4 }} icon={icon({name: 'circle-notch', spin})} />
      </div>
    );
  }
}

export default Loading;