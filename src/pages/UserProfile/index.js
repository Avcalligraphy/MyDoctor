/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Gap, Header, ListDoctor, Profile } from '../../component';
import Fire from '../../config/Fire';
import { colors, showError } from '../../utils';

const UserProfile = ({navigation,route}) => {
  const profile = route.params;

  const signOut = () => {
    Fire.auth()
      .signOut()
      .then(() => {
        navigation.replace('GetStarted');
      })
      .catch(err => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
        <Header title="Profile" onPress={() => navigation.goBack()} />
        <Gap height={10} />
        {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
        <Gap height={14} />
        <ListDoctor name="Edit Profile" desc="Last Update Yesterday" type="next" icon="edit-profile" onPress={() => navigation.navigate('UpdateProfile')} />
        <ListDoctor name="Language" desc="Last Update Yesterday" type="next" icon="langauge"/>
        <ListDoctor name="Give Us Rate" desc="Last Update Yesterday" type="next" icon="rate" />
        <ListDoctor  name="Sign Out"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={signOut} />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
});
