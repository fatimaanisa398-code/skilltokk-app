import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator,
  KeyboardAvoidingView, Platform, Alert
} from 'react-native';

const API_URL = 'http://localhost:3001/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Incomplete', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      navigation.replace('Main', { token: data.token, user: data.user });
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <View style={styles.inner}>
          {/* Logo */}
          <View style={styles.logoBlock}>
            <Text style={styles.logo}>
              Skill<Text style={styles.logoAccent}>Tok</Text>
            </Text>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>✦ Learn Smarter</Text>
            </View>
            <Text style={styles.tagline}>Master new skills, 60 seconds at a time.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>Welcome Back</Text>

            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#4a4a6a"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#4a4a6a"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                <Text style={styles.eyeText}>{showPass ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={login}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Sign In →</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.registerBtn}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>
                New here?{' '}
                <Text style={styles.registerAccent}>Create Account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  kav: { flex: 1 },
  inner: { flex: 1, padding: 24, justifyContent: 'center' },

  logoBlock: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 52, fontWeight: '900', color: '#fff', letterSpacing: -2 },
  logoAccent: { color: '#7c5cfc' },
  logoBadge: {
    backgroundColor: '#7c5cfc20', borderRadius: 20, paddingHorizontal: 14,
    paddingVertical: 5, borderWidth: 1, borderColor: '#7c5cfc40', marginTop: 8
  },
  logoBadgeText: { color: '#a78bfa', fontSize: 12, fontWeight: '600' },
  tagline: { color: '#4a4a6a', textAlign: 'center', marginTop: 10, fontSize: 14, lineHeight: 20 },

  form: {
    backgroundColor: '#12121c', borderRadius: 24, padding: 24,
    borderWidth: 1, borderColor: '#1e1e2e',
  },
  formTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 20 },

  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1a28', borderRadius: 14, borderWidth: 1,
    borderColor: '#2a2a3e', marginBottom: 12, paddingHorizontal: 14,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, color: '#fff', paddingVertical: 15, fontSize: 15 },
  eyeBtn: { padding: 6 },
  eyeText: { fontSize: 16 },

  btn: {
    backgroundColor: '#7c5cfc', borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 8, shadowColor: '#7c5cfc',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
  divider: { flex: 1, height: 1, backgroundColor: '#1e1e2e' },
  dividerText: { color: '#4a4a6a', marginHorizontal: 12, fontSize: 12 },

  registerBtn: { alignItems: 'center' },
  registerText: { color: '#7a7a9a', fontSize: 14 },
  registerAccent: { color: '#7c5cfc', fontWeight: '700' },
});
