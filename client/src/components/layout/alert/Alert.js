import React from 'react';
import { useSelector } from 'react-redux';

export default function Alert() {
  const { alert: { alerts } } = useSelector(state=>state);

  return alerts.map((alert) => {
    return (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    )
  });
}
