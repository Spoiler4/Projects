import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { Icon as CustomIcon } from '@/components/CustomTabBar';
import { COLORS, FONTFAMILY } from '@/theme/theme';
import { mockProfile, menuItems } from '@/data/profile';
import type { Profile, MenuItem } from '@/data/profile';
import { router } from 'expo-router';
import { useDeviceWidth } from '@/theme/useDeviceDimensions';

const CustomerProfile = () => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [draft, setDraft] = useState<Profile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  const SCREEN_WIDTH = useDeviceWidth();

  useEffect(() => {
    // Instantly set step to 1 so Moti components animate/render immediately
    const timer = setTimeout(() => setStep(1), 50);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = (index: number) => ({
    from: { opacity: 0, transform: [{ translateY: 15 }] },
    animate: {
      opacity: step >= 1 ? 1 : 0,
      translateY: step >= 1 ? 0 : 15,
    },
    transition: {
      type: 'spring' as const,
      damping: 12,
      stiffness: 150,
      delay: index * 40,
    },
  });

  const handleEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const handleMenuPress = (item: MenuItem) => {
    if (item.route === '/logout') {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ]);
      return;
    }
    Alert.alert(item.label, 'This section is coming soon in this demo.');
  };

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryOrangeHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewContent}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#D17842', '#DC3535']}
          style={styles.HeaderGradient}
        >
          <MotiView {...fadeUp(1)} style={styles.HeaderContent}>
            <Image source={{ uri: profile.avatar }} style={styles.Avatar} />

            {isEditing ? (
              <View style={styles.EditForm}>
                <TextInput
                  style={styles.Input}
                  value={draft.name}
                  onChangeText={(text) => setDraft({ ...draft, name: text })}
                  placeholder="Full name"
                  placeholderTextColor="#ffffffaa"
                />
                <TextInput
                  style={styles.Input}
                  value={draft.email}
                  onChangeText={(text) => setDraft({ ...draft, email: text })}
                  placeholder="Email"
                  placeholderTextColor="#ffffffaa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.Input}
                  value={draft.phone}
                  onChangeText={(text) => setDraft({ ...draft, phone: text })}
                  placeholder="Phone"
                  placeholderTextColor="#ffffffaa"
                  keyboardType="phone-pad"
                />
                <View style={styles.EditActions}>
                  <TouchableOpacity
                    style={[styles.EditButton, styles.CancelButton]}
                    onPress={handleCancel}
                  >
                    <Text style={[styles.EditText, styles.CancelEditText]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.EditButton} onPress={handleSave}>
                    <Text style={styles.EditText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <MotiText style={styles.Name}>{profile.name}</MotiText>
                <MotiText style={styles.Email}>{profile.email}</MotiText>
                <TouchableOpacity style={styles.EditButton} onPress={handleEdit}>
                  <CustomIcon
                    name="Pencil"
                    color={COLORS.primaryOrangeHex}
                    size={16}
                    style={styles.EditIcon}
                  />
                  <Text style={styles.EditText}>Edit Profile</Text>
                </TouchableOpacity>
              </>
            )}
          </MotiView>
        </LinearGradient>

        {/* Bio */}
        <MotiView {...fadeUp(2)} style={styles.BioContainer}>
          <MotiText style={styles.BioLabel}>Bio</MotiText>
          {isEditing ? (
            <TextInput
              style={[styles.BioInput, styles.Input]}
              value={draft.bio}
              onChangeText={(text) => setDraft({ ...draft, bio: text })}
              placeholder="Bio"
              placeholderTextColor="#828282"
              multiline
            />
          ) : (
            <MotiText style={styles.BioText}>{profile.bio}</MotiText>
          )}

          {isEditing ? (
            <TextInput
              style={[styles.BioInput, styles.Input]}
              value={draft.location}
              onChangeText={(text) => setDraft({ ...draft, location: text })}
              placeholder="Location"
              placeholderTextColor="#828282"
            />
          ) : (
            <MotiView style={styles.LocationRow}>
              <CustomIcon name="MapPin" size={14} color="#828282" />
              <Text style={styles.LocationText}>{profile.location}</Text>
            </MotiView>
          )}
        </MotiView>

        {/* Stats */}
        <MotiView {...fadeUp(3)} style={styles.StatsSection}>
          <MotiText style={styles.SectionTitle}>Overview</MotiText>
          <View style={styles.StatsRow}>
            {[
              { label: 'Orders', value: profile.stats.orders, icon: 'Package' },
              { label: 'Saved', value: profile.stats.saved, icon: 'Heart' },
              { label: 'Reviews', value: profile.stats.reviews, icon: 'Star' },
              { label: 'Points', value: profile.stats.points, icon: 'Award' },
            ].map((stat, i) => (
              <MotiView key={i} style={[styles.StatCard, { width: SCREEN_WIDTH / 4 - 20 }]}>
                <CustomIcon
                  name={stat.icon}
                  color={COLORS.primaryOrangeHex}
                  size={20}
                  style={styles.StatIcon}
                />
                <MotiText style={styles.StatValue}>{stat.value}</MotiText>
                <MotiText style={styles.StatLabel}>{stat.label}</MotiText>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Membership */}
        <MotiView {...fadeUp(4)} style={styles.MembershipCard}>
          <View style={styles.MembershipHeader}>
            <MotiText style={styles.MembershipTitle}>Membership</MotiText>
            <MotiText style={styles.MembershipTier}>{profile.membership.tier}</MotiText>
          </View>
          <View style={styles.ProgressTrack}>
            <View
              style={[
                styles.ProgressFill,
                { width: `${profile.membership.progress}%` },
              ]}
            />
          </View>
          <MotiText style={styles.MembershipSub}>
            {profile.membership.progress}% to {profile.membership.nextTier}
          </MotiText>
          <MotiText style={styles.JoinedText}>
            Member since {profile.joined}
          </MotiText>
        </MotiView>

        {/* Menu */}
        <MotiView {...fadeUp(5)} style={styles.MenuSection}>
          <MotiText style={styles.SectionTitle}>Settings</MotiText>
          {menuItems.map((item, i) => (
            <View key={i} style={styles.MenuItemContainer}>
              <TouchableOpacity
                style={[styles.MenuItem, item.destructive && styles.MenuItemDestructive]}
                onPress={() => handleMenuPress(item)}
              >
                <CustomIcon
                  name={item.icon}
                  color={
                    item.destructive
                      ? COLORS.primaryRedHex
                      : '#828282'
                  }
                  size={20}
                  style={styles.MenuIcon}
                />
                <MotiText
                  style={[
                    styles.MenuLabel,
                    item.destructive && styles.MenuLabelDestructive,
                  ]}
                >
                  {item.label}
                </MotiText>
                <CustomIcon
                  name="ChevronRight"
                  color="#828282"
                  size={16}
                  style={styles.Chevron}
                />
              </TouchableOpacity>
              {i < menuItems.length - 1 && <View style={styles.Divider} />}
            </View>
          ))}
        </MotiView>

        <View style={styles.FooterSpacer} />
        <MotiText style={styles.FooterText}>Fratelli v1.0.0</MotiText>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ScrollViewContent: {
    paddingBottom: 40,
  },
  HeaderGradient: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 30,
  },
  HeaderContent: {
    alignItems: 'center',
  },
  Avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 14,
  },
  Name: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  Email: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 14,
    color: '#FFFFFFCC',
  },
  EditButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  EditIcon: {},
  EditText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 13,
    color: COLORS.primaryOrangeHex,
  },
  EditForm: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  Input: {
    width: '100%',
    backgroundColor: '#ffffff22',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 14,
    color: '#000000',
  },
  EditActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  CancelButton: {
    backgroundColor: '#ffffff33',
  },
  CancelEditText: {
    color: '#FFFFFF',
  },
  BioContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  BioLabel: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  BioText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    marginBottom: 10,
  },
  BioInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
    color: '#000000',
  },
  LocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  LocationText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 13,
    color: '#828282',
  },
  StatsSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  SectionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: '#000000',
    marginBottom: 14,
  },
  StatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StatCard: {
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingVertical: 12,
    borderRadius: 12,
  },
  StatIcon: {
    marginBottom: 8,
  },
  StatValue: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 18,
    color: '#000000',
    marginBottom: 2,
  },
  StatLabel: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 11,
    color: '#828282',
  },
  MembershipCard: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    padding: 18,
  },
  MembershipHeader: {
    flexDirection: 'row',
    justifyModel: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  MembershipTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    color: '#000000',
  },
  MembershipTier: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 14,
    color: COLORS.primaryOrangeHex,
  },
  ProgressTrack: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  ProgressFill: {
    height: 6,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 3,
  },
  MembershipSub: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 13,
    color: COLORS.primaryOrangeHex,
    marginBottom: 10,
  },
  JoinedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
    color: '#828282',
  },
  MenuSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  MenuItemContainer: {
    marginBottom: 1,
  },
  MenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  MenuItemDestructive: {
    backgroundColor: '#FDECEC',
  },
  MenuIcon: {
    marginRight: 2,
  },
  MenuLabel: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 15,
    color: '#000000',
    flex: 1,
  },
  MenuLabelDestructive: {
    color: COLORS.primaryRedHex,
  },
  Chevron: {},
  Divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  FooterSpacer: {
    height: 20,
  },
  FooterText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 11,
    color: '#828282',
    textAlign: 'center',
    marginTop: 10,
  },
});
