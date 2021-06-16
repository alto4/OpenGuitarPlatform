import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} class={`alert alert-${alert.alertType}`}>
      {alert.message}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// Map array of alerts to component
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
