/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gap } from '../../component/atom';
import { DoctorCategory, NewsItem, RatedDoctor } from '../../component/molecules';
import HomeProfile from '../../component/molecules/HomeProfile';
import { colors, fonts, getData, showError} from '../../utils';
import {  ILNullPhoto } from '../../assets';
import {Fire} from '../../config';

const Doctor = ({navigation}) => {
    const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

  const getTopRatedDoctors = () => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setDoctors(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getCategoryDoctor = () => {
    Fire.database()
      .ref('category_doctor/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setCategoryDoctor(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };
    return (
        <View style={styles.page}>
            <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
            <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
            </View>
            <View style={styles.wrapperScroll}>
            <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.category}>
            <Gap width={32} />
            {/* {
                JSONCategoryDoctor.data.map(item => {
                    return <DoctorCategory key={item.id} category={item.category} onPress={() => navigation.navigate('ChooseDoctor') } />;
                })
            } */}
            {
                categoryDoctor.map(item => {
                    return <DoctorCategory key={item.id} category={item.category} onPress={() => navigation.navigate('ChooseDoctor', item) } />;
                })
            }
            {/* <DoctorCategory category="dokter umum" />
            <DoctorCategory category="psikiater" />
            <DoctorCategory category="dokter obat" />
            <DoctorCategory category="dokter umum " /> */}
            <Gap width={22} />
            </View>
            </ScrollView>
            </View>
            <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(doctor => {
                return <RatedDoctor key={doctor.id} name={doctor.data.fullName}
                desc={doctor.data.profession} avatar={{uri: doctor.data.photo}} onPress={() => navigation.navigate('DoctorProfile', doctor) } />;
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
            </View>
            {news.map(item => {
                return (
                    <NewsItem key={item.id} title={item.title} date={item.date} image={item.image} />
                );
            })}
            <Gap height={30} />
            </ScrollView>

            </View>

        </View>
    );
};

export default Doctor;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex: 1,
    },
    wrapperSection: {
        paddingHorizontal: 16,

    },
    content: {
        backgroundColor: colors.white,
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    welcome: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
        maxWidth: 209,
    },
    category: {
        flexDirection: 'row',
    },
    wrapperScroll: {
        marginHorizontal: -16,
    },
    sectionLabel: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
    },
});
