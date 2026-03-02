import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'patient' | 'doctor' | 'admin' | null;

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'none';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  phone: string;
  birthYear?: number;
  verified: boolean;
}

export interface DoctorProfile {
  userId: string;
  specialty: string;
  bio: string;
  price: number;
  verificationStatus: VerificationStatus;
  documents: string[];
  rating?: number;
  isOnline?: boolean;
}

export interface Disease {
  id: string;
  category: string;
  title: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  warningSigns: string[];
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface SymptomCheckResult {
  id: string;
  userId: string;
  answers: { questionId: string; answer: string }[];
  riskLevel: RiskLevel;
  recommendation: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  patientId: string;
  doctorId: string;
  messages: ChatMessage[];
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  datetime: string;
  status: AppointmentStatus;
  price: number;
}

interface AppContextState {
  currentUser: User | null;
  doctorProfiles: DoctorProfile[];
  diseases: Disease[];
  chats: Chat[];
  appointments: Appointment[];
  symptomResults: SymptomCheckResult[];
  setCurrentUser: (user: User | null) => void;
  updateDoctorVerification: (userId: string, status: VerificationStatus) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [doctorProfiles, setDoctorProfiles] = useState<DoctorProfile[]>([
    {
      userId: 'doc1',
      specialty: 'Dahiliye',
      bio: 'Genel dahiliye uzmanı, 10+ yıl deneyim.',
      price: 350,
      verificationStatus: 'approved',
      documents: [],
      rating: 4.8,
      isOnline: true,
    },
    {
      userId: 'doc2',
      specialty: 'Çocuk Sağlığı',
      bio: 'Çocuk sağlığı ve hastalıkları uzmanı.',
      price: 300,
      verificationStatus: 'pending',
      documents: [],
      rating: 4.5,
      isOnline: false,
    },
  ]);

  const [diseases] = useState<Disease[]>([
    {
      id: 'flu',
      category: 'Enfeksiyon',
      title: 'Mevsimsel Grip',
      description:
        'Mevsimsel grip; ateş, kas ağrıları, halsizlik ve kuru öksürük ile seyreden viral bir enfeksiyondur.',
      symptoms: ['38°C ve üzeri ateş', 'Kas ve eklem ağrıları', 'Kuru öksürük', 'Halsizlik'],
      prevention: [
        'Her yıl mevsimsel grip aşısı',
        'El hijyenine dikkat etmek',
        'Kalabalık ortamlarda maske kullanmak',
      ],
      warningSigns: [
        'Nefes darlığı',
        'Göğüs ağrısı',
        'Devam eden yüksek ateş',
        'Bilinç değişikliği',
      ],
    },
    {
      id: 'hypertension',
      category: 'Kardiyoloji',
      title: 'Hipertansiyon (Yüksek Tansiyon)',
      description:
        'Hipertansiyon, atardamar duvarlarına uzun süreli yüksek basınç uygulanması ile karakterize, genellikle belirti vermeden seyreden kronik bir hastalıktır.',
      symptoms: ['Baş ağrısı', 'Baş dönmesi', 'Görme bulanıklığı', 'Çarpıntı'],
      prevention: [
        'Tuz tüketimini azaltmak',
        'Düzenli egzersiz yapmak',
        'Sağlıklı beslenme',
        'Sigara ve alkolden kaçınmak',
      ],
      warningSigns: [
        'Şiddetli baş ağrısı',
        'Göğüs ağrısı',
        'Felç bulguları (konuşma bozulması, kol/bacakta güçsüzlük)',
      ],
    },
  ]);
  const [chats] = useState<Chat[]>([]);
  const [appointments] = useState<Appointment[]>([]);
  const [symptomResults] = useState<SymptomCheckResult[]>([]);

  const updateDoctorVerification = (userId: string, status: VerificationStatus) => {
    setDoctorProfiles(prev =>
      prev.map(doc => (doc.userId === userId ? { ...doc, verificationStatus: status } : doc))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        doctorProfiles,
        diseases,
        chats,
        appointments,
        symptomResults,
        setCurrentUser,
        updateDoctorVerification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextState => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
};

