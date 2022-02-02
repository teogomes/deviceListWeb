import React, { useEffect, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import useThemedStyles from "../Theme/useThemedStyles";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getQuoteOfTheDay } from "../Services/quoteCalls";

// Actions
import {
  addDevice,
  deleteDevice,
  editDevice,
} from "../Redux/Actions/devicesActions";

const DeviceDetail = ({ addDevice, deleteDevice, editDevice }) => {
  const styles = useThemedStyles(style);
  const history = useHistory();
  const location = useLocation();
  const selectedDevice = location?.state?.device;
  const [device, setDevice] = useState({
    id: Math.random(),
    owner: "",
    model: "",
    os: "",
  });

  useEffect(() => {
    if (location?.state?.device) {
      setDevice();
    }
  }, [location]);

  useEffect(() => {
    if (selectedDevice) {
      setDevice(selectedDevice);
    }
  }, [location]);

  const onActionButtonPress = () => {
    selectedDevice ? editDevice(device) : addDevice(device);
    history.goBack();
  };

  const onConfirm = () => {
    deleteDevice(device.id);
    history.goBack();
  };

  const onDeletePress = () => {
    getQuoteOfTheDay().then((res) => {
      if (res.data.length > 0) {
        window.confirm(res.data[0].q) && onConfirm();
      }
    });
  };

  const onInputchange = (event) => {
    const { name, value } = event.target;
    setDevice({ ...device, [name]: value });
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          flexDirection: "column",
        }}
      >
        <label style={styles.label}>
          Model
          <input
            style={styles.textInput}
            name="model"
            type="text"
            value={device.model}
            onChange={onInputchange}
          />
        </label>
        <label style={styles.label}>
          Owner
          <input
            style={styles.textInput}
            name="owner"
            type="text"
            value={device.owner}
            onChange={onInputchange}
          />
        </label>
        <label style={styles.label}>
          OS
          <input
            style={styles.textInput}
            name="os"
            type="text"
            value={device.os}
            onChange={onInputchange}
          />
        </label>
        <label style={styles.label}>
          Notes
          <input
            style={styles.textInput}
            name="notes"
            type="text"
            value={device.notes}
            onChange={onInputchange}
          />
        </label>
      </div>
      <div style={{ marginTop: 100 }}>
        {selectedDevice && (
          <button onClick={onDeletePress} style={styles.deleteButton}>
            Delete
          </button>
        )}
        <button onClick={onActionButtonPress} style={styles.actionButton}>
          {selectedDevice ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
};

const style = (theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: theme.colors.primary,
      paddingTop: 100,
      paddingBottom: 100,
    },
    textInput: {
      height: 56,
      width: "50vw",
      padding: theme.sizes.margin,
      borderRadius: 8,
      backgroundColor: theme.colors.secondary,
      marginBottom: theme.sizes.largeMargin,
      marginLeft: theme.sizes.margin,
    },
    actionButton: {
      display: "flex",
      height: 70,
      width: "50vw",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.secondary,
    },
    deleteButton: {
      // display: "flex",
      height: 70,
      width: "50vw",
      marginBottom: theme.sizes.margin,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "red",
    },
    label: {
      display: "flex",
      flexDirection: "column",
    },
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addDevice,
      editDevice,
      deleteDevice,
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(DeviceDetail);
