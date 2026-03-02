import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
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

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  MainTabs: undefined;
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

export type MainTabParamList = {
  Home: undefined;
  Diseases: undefined;
  SymptomChecker: undefined;
  FindDoctor: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00bfa5',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: { paddingBottom: 6, height: 64 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Diseases') iconName = 'medical';
          if (route.name === 'SymptomChecker') iconName = 'pulse';
          if (route.name === 'FindDoctor') iconName = 'people';
          if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Diseases" component={DiseasesScreen} options={{ title: 'Hastalıklar' }} />
      <Tab.Screen
        name="SymptomChecker"
        component={SymptomCheckerScreen}
        options={{ title: 'Semptom Kontrol' }}
      />
      <Tab.Screen
        name="FindDoctor"
        component={FindDoctorScreen}
        options={{ title: 'Uzman Bul' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

export const AppNavigation: React.FC = () => {
  const { currentUser } = useAppContext();

  const isAuthenticated = !!currentUser;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!isAuthenticated && <Stack.Screen name="Auth" component={AuthNavigator} />}
      {isAuthenticated && <Stack.Screen name="MainTabs" component={MainTabs} />}
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

