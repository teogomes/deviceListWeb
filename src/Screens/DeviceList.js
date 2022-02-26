import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import useThemedStyles from "../Theme/useThemedStyles";
import QRCode from "react-qr-code";
import { getDevices } from "../Services/devicesCalls";

function DeviceList({ devices }) {
  const styles = useThemedStyles(style);
  const [registeredDevices, setRegisteredDevices] = useState(devices ?? []);
  let history = useHistory();

  const fetchDevices = () => {
    getDevices().then((res) => {
      setRegisteredDevices(res.data);
    });
  };

  useEffect(fetchDevices, []);

  const onFabPress = () => {
    history.push("/detail");
  };

  const renderItem = (item) => {
    const onCardPress = () => {
      history.push({
        pathname: "/detail",
        state: { deviceId: item.id },
      });
    };

    return (
      <div key={item.id} onClick={onCardPress}>
        <div style={styles.itemSubContainer}>
          <div>
            <div>
              Model: <b style={styles.value}> {item.model}</b>
            </div>
            <div>
              OS: <b style={styles.value}> {item.os}</b>
            </div>
            <div>
              Owner: <b style={styles.value}> {item.owner}</b>
            </div>
            <div>
              Notes: <b style={styles.value}> {item.notes}</b>
            </div>
          </div>
          <QRCode size={60} value={JSON.stringify(item)} />
        </div>
        <div style={styles.line} />
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {registeredDevices.map(renderItem)}
      <div onClick={onFabPress} style={styles.fab}>
        <img
          style={styles.fabIcon}
          alt={"fabIcon"}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa5ldL9PLxqVqbPzS-ZrOYYdDzMSsRuoMJg&usqp=CAU"
          }
        />
      </div>
    </div>
  );
}

const style = (theme) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    itemContainer: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
    },
    itemSubContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
      alignItems: "center",
      flexWrap: "wrap",
    },
    value: {
      color: theme.colors.secondary,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: "white",
      opacity: 1,
    },
    fab: {
      display: "flex",
      height: 100,
      width: 100,
      position: "absolute",
      bottom: theme.sizes.largeMargin,
      right: theme.sizes.margin,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
    },
    fabIcon: {
      height: 32,
      width: 32,
    },
  };
};

const mapStateToProps = (state) => {
  return {
    devices: state.devices,
  };
};

export default connect(mapStateToProps, null)(DeviceList);
