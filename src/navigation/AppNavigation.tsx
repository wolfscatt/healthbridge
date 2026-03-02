import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { colors } from '../theme/theme';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { DiseasesScreen } from '../screens/disease/DiseasesScreen';
import { DiseaseDetailScreen } from '../screens/disease/DiseaseDetailScreen';
import { SymptomCheckerScreen } from '../screens/symptom/SymptomCheckerScreen';
import { SymptomResultScreen } from '../screens/symptom/SymptomResultScreen';
import { FindDoctorScreen } from '../screens/doctor/FindDoctorScreen';
import { DoctorProfileScreen } from '../screens/doctor/DoctorProfileScreen';
import { AskQuestionScreen } from '../screens/chat/AskQuestionScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { AppointmentScreen } from '../screens/appointment/AppointmentScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { DoctorVerificationScreen } from '../screens/profile/DoctorVerificationScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { AdminDoctorsScreen } from '../screens/admin/AdminDoctorsScreen';
import { DoctorDashboardScreen } from '../screens/doctor/DoctorDashboardScreen';
import { DoctorCalendarScreen } from '../screens/doctor/DoctorCalendarScreen';
import { DoctorEarningsScreen } from '../screens/doctor/DoctorEarningsScreen';
import { DoctorAppointmentsTabScreen } from '../screens/doctor/DoctorAppointmentsTabScreen';
import { AdminInfoScreen } from '../screens/admin/AdminInfoScreen';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  PatientTabs: undefined;
  DoctorTabs: undefined;
  AdminInfo: undefined;
  DiseaseDetail: { diseaseId: string };
  SymptomResult: { riskLevel: string };
  DoctorProfile: { doctorId: string };
  AskQuestion: { doctorId: string };
  Chat: { chatId: string };
  Appointment: { doctorId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type PatientTabParamList = {
  Home: undefined;
  Diseases: undefined;
  SymptomChecker: undefined;
  FindDoctor: undefined;
  Profile: undefined;
};

export type DoctorTabParamList = {
  Consultations: undefined;
  DoctorAppointments: undefined;
  Calendar: undefined;
  Earnings: undefined;
  DoctorProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const PatientTab = createBottomTabNavigator<PatientTabParamList>();
const DoctorTab = createBottomTabNavigator<DoctorTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const PatientTabs = () => {
  return (
    <PatientTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          paddingBottom: 6,
          height: 68,
          borderTopWidth: 0,
          backgroundColor: colors.card,
          elevation: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Diseases') iconName = 'medkit';
          if (route.name === 'SymptomChecker') iconName = 'pulse';
          if (route.name === 'FindDoctor') iconName = 'people';
          if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <PatientTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Ana Sayfa' }}
      />
      <PatientTab.Screen
        name="Diseases"
        component={DiseasesScreen}
        options={{ title: 'Hastalıklar' }}
      />
      <PatientTab.Screen
        name="SymptomChecker"
        component={SymptomCheckerScreen}
        options={{ title: 'Semptom Kontrol' }}
      />
      <PatientTab.Screen
        name="FindDoctor"
        component={FindDoctorScreen}
        options={{ title: 'Uzman Bul' }}
      />
      <PatientTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </PatientTab.Navigator>
  );
};

const DoctorTabs = () => {
  return (
    <DoctorTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          paddingBottom: 6,
          height: 68,
          borderTopWidth: 0,
          backgroundColor: colors.card,
          elevation: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'speedometer';
          if (route.name === 'Consultations') iconName = 'chatbubbles';
          if (route.name === 'DoctorAppointments') iconName = 'calendar';
          if (route.name === 'Calendar') iconName = 'calendar-clear';
          if (route.name === 'Earnings') iconName = 'wallet';
          if (route.name === 'DoctorProfile') iconName = 'person-circle';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <DoctorTab.Screen
        name="Consultations"
        component={DoctorDashboardScreen}
        options={{ title: 'Görüşmeler' }}
      />
      <DoctorTab.Screen
        name="DoctorAppointments"
        component={DoctorAppointmentsTabScreen}
        options={{ title: 'Randevular' }}
      />
      <DoctorTab.Screen
        name="Calendar"
        component={DoctorCalendarScreen}
        options={{ title: 'Takvim' }}
      />
      <DoctorTab.Screen
        name="Earnings"
        component={DoctorEarningsScreen}
        options={{ title: 'Kazançlar' }}
      />
      <DoctorTab.Screen
        name="DoctorProfile"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </DoctorTab.Navigator>
  );
};

export const AppNavigation: React.FC = () => {
  const { currentUser } = useAppContext();

  const isAuthenticated = !!currentUser;
  const role = currentUser?.role;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!isAuthenticated && <Stack.Screen name="Auth" component={AuthNavigator} />}
      {isAuthenticated && role === 'patient' && (
        <Stack.Screen name="PatientTabs" component={PatientTabs} />
      )}
      {isAuthenticated && role === 'doctor' && (
        <Stack.Screen name="DoctorTabs" component={DoctorTabs} />
      )}
      {isAuthenticated && role === 'admin' && (
        <Stack.Screen name="AdminInfo" component={AdminInfoScreen} />
      )}
      <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen} />
      <Stack.Screen name="SymptomResult" component={SymptomResultScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="AskQuestion" component={AskQuestionScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="DoctorVerification" component={DoctorVerificationScreen} />
      <Stack.Screen name="AdminDoctors" component={AdminDoctorsScreen} />
    </Stack.Navigator>
  );
};

