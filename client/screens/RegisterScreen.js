import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator,
  KeyboardAvoidingView, Platform, Alert, ScrollView
} from 'react-native';

const API_URL = 'http://localhost:3001/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const register = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Incomplete', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPass) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Too Short', 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      navigation.replace('Main', { token: data.token, user: data.user });
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>
              Skill<Text style={styles.logoAccent}>Tok</Text>
            </Text>
            <Text style={styles.subtitle}>Create your account</Text>
            <Text style={styles.desc}>Join thousands of learners and start your journey today.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#4a4a6a"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

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
                placeholder="Password (min 6 chars)"
                placeholderTextColor="#4a4a6a"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                <Text>{showPass ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>✅</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#4a4a6a"
                value={confirmPass}
                onChangeText={setConfirmPass}
                secureTextEntry={!showPass}
              />
            </View>

            {/* Strength bar */}
            {password.length > 0 && (
              <View style={styles.strengthRow}>
                <Text style={styles.strengthLabel}>
                  Strength: {password.length < 6 ? '🔴 Weak' : password.length < 10 ? '🟡 Good' : '🟢 Strong'}
                </Text>
                <View style={styles.strengthBar}>
                  <View style={[
                    styles.strengthFill,
                    {
                      width: `${Math.min(100, (password.length / 12) * 100)}%`,
                      backgroundColor: password.length < 6 ? '#fc5c7d' : password.length < 10 ? '#fbbf24' : '#4ade80'
                    }
                  ]} />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={register}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Create Account ✦</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginAccent}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  scroll: { padding: 24, paddingBottom: 40 },

  backBtn: { marginBottom: 20 },
  backText: { color: '#7c5cfc', fontSize: 15, fontWeight: '600' },

  header: { alignItems: 'center', marginBottom: 32 },
  logo: { fontSize: 42, fontWeight: '900', color: '#fff', letterSpacing: -2, marginBottom: 8 },
  logoAccent: { color: '#7c5cfc' },
  subtitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 6 },
  desc: { color: '#4a4a6a', textAlign: 'center', fontSize: 14, lineHeight: 20 },

  form: {
    backgroundColor: '#12121c', borderRadius: 24, padding: 24,
    borderWidth: 1, borderColor: '#1e1e2e',
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1a28', borderRadius: 14, borderWidth: 1,
    borderColor: '#2a2a3e', marginBottom: 12, paddingHorizontal: 14,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, color: '#fff', paddingVertical: 15, fontSize: 15 },
  eyeBtn: { padding: 6 },

  strengthRow: { marginBottom: 12 },
  strengthLabel: { color: '#7a7a9a', fontSize: 12, marginBottom: 4 },
  strengthBar: { height: 4, backgroundColor: '#1a1a28', borderRadius: 2 },
  strengthFill: { height: 4, borderRadius: 2 },

  btn: {
    backgroundColor: '#7c5cfc', borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 8, shadowColor: '#7c5cfc',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  loginBtn: { marginTop: 20, alignItems: 'center' },
  loginText: { color: '#7a7a9a', fontSize: 14 },
  loginAccent: { color: '#7c5cfc', fontWeight: '700' },
});
