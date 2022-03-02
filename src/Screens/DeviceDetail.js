import React, { useEffect, useState } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import useThemedStyles from '../Theme/useThemedStyles';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_DEVICE,
  DELETE_DEVICE,
  EDIT_DEVICE,
  FIND_DEVICE,
  GET_DEVICES,
} from '../Services/graphql/queries';

const DeviceDetail = () => {
  const styles = useThemedStyles(style);
  const history = useHistory();
  const location = useLocation();
  const selectedDeviceId = useParams().id;
  const result = useQuery(FIND_DEVICE, {
    variables: { id: selectedDeviceId },
    skip: !selectedDeviceId,
  });
  const [addDevice] = useMutation(ADD_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
  });
  const [deleteDevice] = useMutation(DELETE_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
  });
  const [editDevice] = useMutation(EDIT_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
  });
  const [device, setDevice] = useState({
    id: Math.random(),
    owner: '',
    model: '',
    os: '',
    notes: '',
  });

  const fetchDevice = () => {
    if (!result?.data) {
      return;
    }
    setDevice(result?.data.findDevice);
  };

  useEffect(fetchDevice, [result.data]);

  useEffect(() => {
    if (location?.state?.device) {
      setDevice();
    }
  }, [location]);

  const onActionButtonPress = async () => {
    if (selectedDeviceId) {
      await editDevice({
        variables: { ...device, id: selectedDeviceId },
      });
    } else {
      const result = await addDevice({
        variables: {
          owner: device.owner,
          model: device.model,
          os: device.os,
          notes: device.notes,
        },
      });

      console.error(result);
    }

    history.goBack();
  };

  const onConfirm = () => {
    deleteDevice({
      variables: {
        id: selectedDeviceId,
      },
    }).then((res) => {
      console.log(res.data);
      history.goBack();
    });
  };

  const onDeletePress = () => {
    onConfirm();
  };

  const onInputchange = (event) => {
    const { name, value } = event.target;
    setDevice({ ...device, [name]: value });
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          flexDirection: 'column',
        }}
      >
        <label style={styles.label}>
          Model
          <input
            style={styles.textInput}
            name='model'
            type='text'
            value={device.model}
            onChange={onInputchange}
          />
        </label>
        <label style={styles.label}>
          Owner
          <input
            style={styles.textInput}
            name='owner'
            type='text'
            value={device.owner}
            onChange={onInputchange}
          />
        </label>
        <label style={styles.label}>
          OS
          <input
            style={styles.textInput}
            name='os'
            type='text'
            value={device.os}
            onChange={onInputchange}
          />
        </label>
        <label style={styles.label}>
          Notes
          <input
            style={styles.textInput}
            name='notes'
            type='text'
            value={device.notes}
            onChange={onInputchange}
          />
        </label>
      </div>
      <div style={{ marginTop: 100 }}>
        {selectedDeviceId && (
          <button onClick={onDeletePress} style={styles.deleteButton}>
            Delete
          </button>
        )}
        <button
          id='add-button'
          onClick={onActionButtonPress}
          style={styles.actionButton}
        >
          {selectedDeviceId ? 'Edit' : 'Add'}
        </button>
      </div>
    </div>
  );
};

const style = (theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: theme.colors.primary,
      paddingTop: 100,
      paddingBottom: 100,
    },
    textInput: {
      height: 56,
      width: '50vw',
      padding: theme.sizes.margin,
      borderRadius: 8,
      backgroundColor: theme.colors.secondary,
      marginBottom: theme.sizes.largeMargin,
      marginLeft: theme.sizes.margin,
    },
    actionButton: {
      display: 'flex',
      height: 70,
      width: '50vw',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondary,
    },
    deleteButton: {
      height: 70,
      width: '50vw',
      marginBottom: theme.sizes.margin,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      color: 'white',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(null, mapDispatchToProps)(DeviceDetail);
