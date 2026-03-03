# HealthBridge (MVP Prototip)

Türkçe mobil sağlık bilgilendirme ve uzman danışmanlık uygulaması prototipi.  
Amaç; **hastalık bilgilendirme, semptom kontrol (triage), uzman listeleme ve basit mesajlaşma/randevu** akışlarını bir arada göstermek.
**Uygulama indirme linki:** https://expo.dev/accounts/velmora/projects/healthbridge/builds/9ad8b8f2-8ef9-4f9f-9b9a-66fe1c24752e
**Video Linki:** https://youtube.com/shorts/mEowPiEsJeA?feature=share

> **Önemli:** HealthBridge **tıbbi tanı koymaz**. Sadece semptomlara dayalı **risk değerlendirmesi ve bilgilendirme** sunar.  
> Acil durumda her zaman **112** aranmalı veya en yakın acil servise başvurulmalıdır.

---

## 1. Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (LTS)
- npm veya yarn
- Expo CLI (global şart değil, `npx` ile de çalışır)

### Projeyi Çalıştırma

```bash
cd "Mobil Uygulama Dersi/healthbridge"
npm install   # (create-expo-app zaten kurduysa çoğu yüklü gelecektir)
npm start     # veya:
npm run android
npm run web
```

Telefonunuzda Expo Go ile QR kodu okutarak veya Android emülatöründe uygulamayı görebilirsiniz.

---

## 2. Mimari Genel Bakış

- **Framework**: Expo + React Native (TypeScript)
- **Navigasyon**: `@react-navigation`
  - Root Stack (`AppNavigation`)
  - Auth Stack (Login / Register)
  - Bottom Tab (Ana sayfa, Hastalıklar, Semptom Kontrol, Uzman Bul, Profil)
- **Durum Yönetimi**: Basit global context (`AppContext`) + `useState`
- **Tema**: Turkuaz / yeşil sağlık temalı, kart bazlı, büyük yuvarlatılmış butonlar

Klasör yapısı (özet):

```text
healthbridge/
  App.tsx
  src/
    context/
      AppContext.tsx
    navigation/
      AppNavigation.tsx
    screens/
      SplashScreen.tsx
      auth/
        LoginScreen.tsx
        RegisterScreen.tsx
      disease/
        DiseasesScreen.tsx
        DiseaseDetailScreen.tsx
      symptom/
        SymptomCheckerScreen.tsx
        SymptomResultScreen.tsx
      doctor/
        FindDoctorScreen.tsx
        DoctorProfileScreen.tsx
      chat/
        AskQuestionScreen.tsx
        ChatScreen.tsx
      appointment/
        AppointmentScreen.tsx
      profile/
        ProfileScreen.tsx
        DoctorVerificationScreen.tsx
      settings/
        SettingsScreen.tsx
      admin/
        AdminDoctorsScreen.tsx
```

---

## 3. Veri Modelleri ve Mock Backend

`src/context/AppContext.tsx` içinde global tipler ve mock veriler tanımlıdır:

- **User**
  - `id`, `role` (`patient` | `doctor` | `admin`), `name`, `phone`, `birthYear?`, `verified`
- **DoctorProfile**
  - `userId`, `specialty`, `bio`, `price`, `verificationStatus`, `documents[]`, `rating?`, `isOnline?`
- **Disease**
  - `id`, `category`, `title`, `description`, `symptoms[]`, `prevention[]`, `warningSigns[]`
- **SymptomCheckResult**
  - (MVP’de sadece tip olarak hazır, context içinde liste mock)
- **Chat**, **Appointment**
  - Basit tipler tanımlı, ekranlarda mock veriler gösteriliyor.

Mock fonksiyonlar:

- `setCurrentUser(user)` – Login/Kayıt sonrası kullanıcıyı set eder.
- `updateDoctorVerification(userId, status)` – Admin panelinden uzmanı **Pending/Approved/Rejected** durumuna çeker.

---

## 4. Ekranlar ve Akışlar

### 4.1 Giriş Akışı

- **Splash (`SplashScreen`)**
  - Kısa animasyon sonrası:
    - Kullanıcı yoksa → `Auth` (Login/Register)
    - Kullanıcı varsa → `MainTabs`

- **Login (`LoginScreen`)**
  - Telefon girişi
  - Rol seçimi: **Hasta**, **Uzman/Doktor**, **Admin (demo)**
  - Her rol için basit bir mock `User` oluşturur ve `currentUser`’ı set edip ana sekmelere geçer.

- **Register (`RegisterScreen`)**
  - Rol seçimi chip’leri: Hasta / Uzman
  - Ad Soyad, Telefon, Doğum Yılı
  - Uzmanlar için `verified: false` ile başlar (doğrulama süreci için).

### 4.2 Ana Navigasyon (Bottom Tab)

- **Ana Sayfa (`HomeScreen`)**
  - 2x3 grid:
    - Hastalıklar
    - Semptom Kontrol
    - Uzman Bul
    - Mesajlar (demo)
    - Randevular (demo)
    - Ayarlar & KVKK
  - Rol bazlı banner:
    - **Doktor**: “Uzman Paneli” + “Belge Yükle & Durumu Gör”
    - **Admin**: “Admin Paneli” + “Uzman Başvuruları”
  - Alt uyarı:
    - Uygulamanın **tıbbi tanı koymadığı** ve acil durumda **112’nin aranması** gerektiği.

- **Hastalıklar (`DiseasesScreen` + `DiseaseDetailScreen`)**
  - Arama kutusu, kategori/hastalık kartları.
  - Detayda:
    - Tanım
    - Belirtiler
    - Korunma
    - “Ne zaman doktora gitmeli?” (warningSigns)
    - Uyarı kutusu: “Bu tıbbi tanı değildir / Acil durumda 112”

- **Semptom Kontrol (`SymptomCheckerScreen` + `SymptomResultScreen`)**
  - 4 adımlı soru akışı:
    - Ateş, nefes darlığı, kronik hastalık, ani başlangıç.
    - Her soruda **Evet/Hayır**, `weight` toplanarak skor oluşturulur.
  - Sonuç ekranı:
    - `low/medium/high` risk seviyesi
    - Renkli başlık ve açıklama metni
    - Her zaman:
      - “Bu bir tıbbi tanı değildir, kesin değerlendirme için hekim gerekir, acil durumda 112.”
    - Butonlar:
      - Yeniden değerlendir
      - Uzman ile görüş (Uzman Bul sekmesine gider)

- **Uzman Bul (`FindDoctorScreen` + `DoctorProfileScreen`)**
  - Uzman listesi:
    - Branş, bio, ücret
    - Online etiketi, doğrulama rozeti (Doğrulandı / Doğrulama Bekliyor)
  - Filtre:
    - Sadece online switch
  - Doktor kartına tıklayınca profil ekranı:
    - Hakkında, ücret, doğrulama durumu
    - **Soru Sor** (mesaj akışına geçiş)
    - **Randevu Al** (randevu akışına geçiş)

- **Profil (`ProfileScreen`)**
  - Kullanıcı bilgileri (isim, rol, telefon, doğum yılı).
  - Doktor için:
    - “Belge Yükle & Doğrulama Durumu” (`DoctorVerificationScreen`)
  - Admin için:
    - “Uzman Başvurularını Yönet” (`AdminDoctorsScreen`)
  - Herkes için:
    - “Ayarlar & KVKK” (`SettingsScreen`)

---

## 5. Uzman Doğrulama ve Admin Akışı

- **Uzman tarafı (`DoctorVerificationScreen`)**
  - Sadece `role === 'doctor'` ise erişilebilir.
  - Mevcut doğrulama durumu gösterilir:
    - Pending, Approved, Rejected (mock `DoctorProfile`’dan).
  - “Belge Yükle” butonu:
    - Gerçek upload yok, sadece demo; state değiştirerek “Belge Gönderildi (Demo)” mesajı gösterilir.

- **Admin tarafı (`AdminDoctorsScreen`)**
  - `DoctorProfile` listesi içinden `approved` olmayanları listeler.
  - Her uzman için:
    - Branş, şu anki durum.
    - **Onayla** → `updateDoctorVerification(userId, 'approved')`
    - **Reddet** → `updateDoctorVerification(userId, 'rejected')`
  - Böylece end-to-end **pending → approved/rejected** akışı mock olarak görülebilir.

---

## 6. Mesajlaşma ve Randevu (Mock)

- **Soru Sor (`AskQuestionScreen`)**
  - Çok satırlı metin alanı.
  - “Dosya ekle (demo)” → sadece placeholder.
  - “Soruyu Gönder” → `ChatScreen`’e yönlendirme (statik chat id).
  - Alt uyarı: Acil durumlar için uygun olmadığı, 112 aranması gerektiği.

- **Mesajlaşma (`ChatScreen`)**
  - Basit iki taraflı mock mesaj listesi.
  - Alt kısımda mesaj inputu ve “Gönder” butonu (işlevsel backend yok, sadece UI).

- **Randevu (`AppointmentScreen`)**
  - Hazır tarih/saat slot listesi.
  - Seçili slot vurgulanır.
  - Altta ödeme açıklaması:
    - Gerçek ödeme yok, ileride ödeme altyapısı + komisyon modeli ekleneceği belirtilir.

---

## 7. KVKK, Gizlilik ve Hesap Yönetimi

**`SettingsScreen`** ekranında:

- **KVKK Onayı**
  - KVKK aydınlatma metnini özetleyen açıklama.
  - “Okudum, onaylıyorum” switch’i (uygulama içinde state tutar).

- **Gizlilik Metni**
  - Sağlık verilerinin özel nitelikli kişisel veri olduğu ve gerçek sistemde:
    - Şifreli
    - Mevzuata uygun
    - Sınırlı süreli
    - Kullanıcı talebiyle silinebilir
  biçimde saklanması gerektiği vurgulanır.

- **Hesap İşlemleri**
  - Çıkış Yap → `currentUser` null yapılır.
  - Hesabı Sil (Demo) → Uyarı ile onay alır, ardından `currentUser` null yapar.

> Gerçek bir üretim ortamında; KVKK metni, açık rıza metni, çerez politikası vb. hukuken onaylı metinler kullanılmalı ve sunucu tarafında loglanmalıdır.

---

## 8. Geliştirme Notları ve Sonraki Adımlar

Bu proje bir **MVP / eğitim amaçlı prototip** olarak tasarlanmıştır.

İleri fazlar için öneriler:

- **Gerçek backend** (Node/Go/.NET veya serverless) + JWT auth
- **Veri saklama**: Şifreli veritabanı, rollere göre yetkilendirme, loglama
- **Gerçek dosya yükleme** (uzman belgeleri, tetkik sonuçları vb.)
- **Randevu & ödeme entegrasyonu**
  - Ödeme servisleri (İyzico, Stripe vb.)
  - Komisyon modeli (örneğin: her seans üzerinden %X platform payı)
- **Gelişmiş semptom kontrol motoru**
  - Uzmanların kural seti tanımlayabildiği, şeffaf ve loglanabilir kural motoru
- **Ek güvenlik önlemleri**
  - İki faktörlü doğrulama
  - Oturum süresi, IP kontrolü, rate limit vb.

Bu README, projeyi hızlıca ayağa kaldırmanız ve akışları anlamanız için özet bir rehberdir. Kodun tamamı TypeScript ile yazıldığı için, bileşen ve tip isimleri üzerinden kolayca keşfe devam edebilirsiniz.

