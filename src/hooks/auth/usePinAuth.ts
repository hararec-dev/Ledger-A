import { useCallback, useState } from 'react';
import * as Keychain from 'react-native-keychain';

const PIN_STORAGE_KEY = 'USER_PIN_KEY';
const PIN_USERNAME = 'PIN_AUTH_USER';

export const usePinAuth = (handleFailedAttempt?: () => void) => {
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [isPinSet, setIsPinSet] = useState<boolean | null>(null);

    const checkPinExists = useCallback(async (): Promise<boolean> => {
        try {
            const credentials = await Keychain.getGenericPassword({ service: PIN_STORAGE_KEY });
            const exists = !!credentials;
            setIsPinSet(exists);
            return exists;
        } catch (error) {
            setIsPinSet(false);
            return false;
        }
    }, []);

    const createPin = useCallback(async (pin: string): Promise<boolean> => {
        setLoadingAuth(true);
        try {
            if (!/^\d{4,6}$/.test(pin)) {return false;}
            await Keychain.setGenericPassword(PIN_USERNAME, pin, {
                service: PIN_STORAGE_KEY,
                accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            });
            setIsPinSet(true);
            return true;
        } catch (error) {
            return false;
        } finally {
            setLoadingAuth(false);
        }
    }, []);

    const validatePin = useCallback(async (pin: string): Promise<boolean> => {
        setLoadingAuth(true);
        try {
            const credentials = await Keychain.getGenericPassword({ service: PIN_STORAGE_KEY });

            if (!credentials) {return false;}
            const isValid = credentials.password === pin;

            if (!isValid && handleFailedAttempt) {handleFailedAttempt();}
            return isValid;
        } catch (error) {
            if (handleFailedAttempt) {handleFailedAttempt();}
            return false;
        } finally {
            setLoadingAuth(false);
        }
    }, [handleFailedAttempt]);

    const changePin = useCallback(async (currentPin: string, newPin: string): Promise<boolean> => {
        setLoadingAuth(true);
        try {
            const isValid = await validatePin(currentPin);
            if (!isValid) {return false;}
            return await createPin(newPin);
        } catch (error) {
            return false;
        } finally {
            setLoadingAuth(false);
        }
    }, [validatePin, createPin]);

    const resetPin = useCallback(async (): Promise<boolean> => {
        setLoadingAuth(true);
        try {
            await Keychain.resetGenericPassword({ service: PIN_STORAGE_KEY });
            setIsPinSet(false);
            return true;
        } catch (error) {
            return false;
        } finally {
            setLoadingAuth(false);
        }
    }, []);

    return {
        createPin,
        validatePin,
        changePin,
        resetPin,
        checkPinExists,
        isPinSet,
        loadingAuth,
    };
};
