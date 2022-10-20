import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Checkbox from '../../../components/Checkbox/Checkbox';
import assets from '../../../assets';


const Notifications = ({ navigation }) => {
    return (
        <LinearGradient
            colors={["#D8E3F3", '#B8F7FC',]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <SafeAreaView styles={{ flex: 1 }} >
                <View style={[styles.header]}>
                    <Pressable hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
                        onPress={() => navigation.goBack()}>
                        <Image source={assets.backChat} />
                    </Pressable>
                    <Text style={styles.messageText}>Notifications</Text>
                    <View></View>
                </View>
                <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>
                    <ScrollView>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Image source={assets.notificationsEmail} />
                                <View style={{ marginHorizontal: 10, flex: 1 }}>
                                    <Text style={styles.textNormal}>Show chat head</Text>
                                    <Text style={styles.text2}>Cras justo odio, dapibus ac facilisis in</Text>
                                </View>
                            </View>
                            <Checkbox />
                        </View>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Image source={assets.notificationsSms} />
                                <View style={{ marginHorizontal: 10, flex: 1 }}>
                                    <Text style={styles.textNormal}>SMS</Text>
                                    <Text style={styles.text2}>Cras justo odio, dapibus ac facilisis in</Text>
                                </View>
                            </View>
                            <Checkbox />
                        </View>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Image source={assets.notificationsPhone} />
                                <View style={{ marginHorizontal: 10, flex: 1 }}>
                                    <Text style={styles.textNormal}>Phone</Text>
                                    <Text style={styles.text2}>Cras justo odio, dapibus ac facilisis in</Text>
                                </View>
                            </View>
                            <Checkbox />
                        </View>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        </LinearGradient >
    );
};

export default Notifications;

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 24,
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textNormal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0E0E2F',
        fontFamily: 'Inter',
    },
    messageText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3482',
        fontFamily: 'Inter',
        marginRight: 15
    },
    body: {
        height: '100%',
        padding: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    text2: {
        marginTop: 4,
        fontWeight: '400',
        fontSize: 14,
        color: "#63798B",
        fontFamily: 'Inter',
    },
});