/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet,View } from 'react-native';
import { Header, ListDoctor } from '../../component/molecules';
import { Fire } from '../../config';
import { colors } from '../../utils';

const ChooseDoctor = ({navigation, route}) => {
    const [ListDoctors, setListDoctors] = useState([]);
    const itemCategory = route.params;
    useEffect(() => {
        callDoctorByCategory(itemCategory.category);
    }, [itemCategory]);

    const callDoctorByCategory = (category) => {
        Fire
        .database()
        .ref('doctors/')
        .orderByChild('category')
        .equalTo(category)
        .once('value')
        .then(res => {
            console.log('data list doctor:', res.val());
            if (res.val()) {
                const oldData = res.val();
                const data = [];
                Object.keys(oldData).map(item => {
                    data.push({
                        id: item,
                        data: oldData[item],
                    });
                });
                console.log('parse list doctor: ', data);
                setListDoctors(data);
            }
        });
    };
    return (
        <View style={styles.page}>
            <Header type="dark" title={`Pilih ${itemCategory.category}`} onPress={() => navigation.goBack()} />
            {ListDoctors.map(doctor => {
                return  <ListDoctor key={doctor.id} type="next" profile={{uri: doctor.data.photo}} name={doctor.data.fullName} desc={doctor.data.gender} onPress={() => navigation.navigate('DoctorProfile', doctor) } />;
            })}
        </View>
    );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
});
