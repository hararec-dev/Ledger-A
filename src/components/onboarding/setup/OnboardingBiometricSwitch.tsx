import { Text, View } from 'react-native';
import { FormSetupGroup, GradientSwitch, IonIcon } from '../../../components';
import { useStyles } from '../../../hooks';
import { ONBOARDING_SETUP_TEXT } from '../../../config';
import type { OnboardingFormProps } from '../../../types';


export const OnboardingBiometricSwitch: React.FC<OnboardingFormProps> = ({ formik, gradientColors }) => {
    const styles = useStyles(({ colors, isDark }) => ({
        switchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingTop: 5,
        },
        switchAndText: {
            flexDirection: 'row',
            alignItems: 'center',
            width: 50,
        },
        switchText: {
            marginLeft: 10,
            fontSize: 16,
            color: isDark ? colors.coolGray[50] : colors.coolGray[900],
            fontFamily: 'Quicksand-Regular',
        },
        ionIcon: {
            color: isDark ? colors.coolGray[50] : colors.coolGray[900],
            size: 30,

        },
    }));

    return (
        <FormSetupGroup
            label={ONBOARDING_SETUP_TEXT.biometricAuthLabel || 'Autenticación biométrica'}
            error={formik.errors.isTouchIdEnabled}
            touched={formik.touched.isTouchIdEnabled}
        >
            <View style={styles.switchContainer}>
                <IonIcon
                    name={'finger-print'}
                    size={styles.ionIcon.size}
                    color={styles.ionIcon.color}
                />
                <View style={styles.switchAndText}>
                    <GradientSwitch
                        value={formik.values.isTouchIdEnabled}
                        onValueChange={(value) => formik.setFieldValue('isTouchIdEnabled', value)}
                        gradientColors={gradientColors}
                    />
                    <Text style={styles.switchText}>
                        {formik.values.isTouchIdEnabled ? 'Si' : 'No'}
                    </Text>
                </View>
            </View>
        </FormSetupGroup>
    );
};
