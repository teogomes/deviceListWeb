import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useThemedStyles from '../Theme/useThemedStyles';
import DeviceCard from './Components/DeviceCard';
import { useQuery } from '@apollo/client';
import { GET_DEVICES } from '../Services/graphql/queries';

const DeviceList = ({ devices }) => {
  const styles = useThemedStyles(style);
  let history = useHistory();
  const result = useQuery(GET_DEVICES);

  const onCardPress = useCallback(
    (device) => {
      history.push(`/detail/${device.id}`);
    },
    [history]
  );

  const onFabPress = () => {
    history.push('/detail');
  };

  return (
    <div style={styles.container}>
      {result?.data?.allDevices?.map((item) => (
        <DeviceCard
          key={item.id}
          device={item}
          onClick={() => onCardPress(item)}
        />
      ))}
      <div id='fab-button' onClick={onFabPress} style={styles.fab}>
        <img
          style={styles.fabIcon}
          alt={'fabIcon'}
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa5ldL9PLxqVqbPzS-ZrOYYdDzMSsRuoMJg&usqp=CAU'
          }
        />
      </div>
    </div>
  );
};

const style = (theme) => {
  return {
    container: {
      flex: 1,
    },
    fabWrapper: {
      position: 'fixed',
      height: '100%',
      width: '100%',
    },
    fab: {
      display: 'flex',
      height: 100,
      width: 100,
      position: 'absolute',
      bottom: 100,
      right: theme.sizes.margin,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
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
