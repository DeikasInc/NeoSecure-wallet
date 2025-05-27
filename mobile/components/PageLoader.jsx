import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { styles } from '../assets/styles/home.styles';
import { COLORS } from '../constants/colors.js'

const PageLoader = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>

    )

};

export default PageLoader;