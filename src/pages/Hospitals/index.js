/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { DummyHospital1, DummyHospital2, DummyHospital3, ILHospitalBG } from '../../assets';
import { ListHospital } from '../../component';
import { colors, fonts } from '../../utils';

const Hospitals = () => {
    return (
        <View style={styles.page}>
            <ImageBackground source={ILHospitalBG} style={styles.background}>
                <Text style={styles.title}>Nearby Hospital</Text>
                <Text style={styles.desc}>3 Tersedia</Text>
            </ImageBackground>
            <View style={styles.content}>
            <ListHospital type="Rumah Sakit" name="Achmad Saugi" address="Jln. Kasih Saynag 20" pic={DummyHospital1} />
            <ListHospital type="Rumah Sakit Anak" name="Happy Family Kids" address="Jln. Kasih Saynag 20" pic={DummyHospital2} />
            <ListHospital type="Rumah Sakit Jiwa" name="Tingkatan paling Atas" address="Jln. Kasih Saynag 20" pic={DummyHospital3} />
            </View>
        </View>
    );
};

export default Hospitals;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex: 1,
    },
    background: {
        height: 240,
        paddingTop: 30,
    },
    content: {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginTop: -30,
        flex: 1,
        paddingTop: 14,
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.white,
        textAlign: 'center',
    },
    desc: {
        fontSize: 14,
        fontFamily: fonts.primary[300],
        color: colors.white,
        marginTop: 6,
        textAlign: 'center',
    },
});
