import React from 'react';
import QRCode from 'react-qr-code';

const DeviceCard = ({ device, onClick }) => {
  return (
    <div
      data-testid='deviceCard'
      className='device-card-container'
      key={device.id}
      onClick={onClick}
    >
      <div className='device' style={styles.itemSubContainer}>
        <div>
          <div data-testid='model'>
            Model: <b style={styles.value}> {device.model}</b>
          </div>
          <div>
            OS: <b style={styles.value}> {device.os}</b>
          </div>
          <div>
            Owner: <b style={styles.value}> {device.owner}</b>
          </div>
          <div>
            Notes: <b style={styles.value}> {device.notes}</b>
          </div>
        </div>
        <QRCode size={60} value={JSON.stringify(device)} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  itemSubContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  value: {
    color: '#118374',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
    opacity: 1,
  },
};

export default DeviceCard;
