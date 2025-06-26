import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCompanyDetails, setUserMenuControl, setUserProfile } from '../redux/slices/userDataSlice';
import { initAppContext } from '../Utility/AppInitializer';
import { changeLanguage } from '../Localization/Localisation';

const LoaderScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const finalJSON = route?.params?.jsonParams;

    useEffect(() => {
        const init = async () => {
            await initAppContext(finalJSON);
            changeLanguage(finalJSON?.languageCode);
            dispatch(setCompanyDetails(finalJSON?.companyDetails));
            dispatch(setUserMenuControl(finalJSON?.userMenuControl));
            dispatch(setUserProfile(finalJSON?.userProfile));

            navigation.navigate(finalJSON.classType)

        };

        init();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default LoaderScreen;
