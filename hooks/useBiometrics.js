import React, {useEffect, useState} from 'react';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const useBiometrics = () => {
  const [sensorAvailable, setSensorAvailable] = useState(false);
  const handleGenerateKeys = async () => {
    try {
      const {keysExist} = await rnBiometrics.biometricKeysExist();
      if (!keysExist) {
        const {publicKey} = await rnBiometrics.createKeys();
        console.log(publicKey);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBiometric = async () => {
    const {success, signature} = await rnBiometrics.createSignature({
      promptMessage: 'Sign your transaction',
      payload: 'Send Gcoin',
    });

    if (success) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(result => {
      const {available, biometryType} = result;
      console.log(available);
      if (available && biometryType === BiometryTypes.FaceID) {
        console.log('face-id supported');
      } else if (available && biometryType === BiometryTypes.TouchID) {
        console.log('Touch-id supported');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics available');
      } else {
        console.log('biometrics not available');
      }
      setSensorAvailable(available);
      handleGenerateKeys();
    });
  }, []);

  return {
    handleBiometric,
    sensorAvailable,
  };
};

export default useBiometrics;
