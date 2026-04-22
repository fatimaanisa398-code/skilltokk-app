import { useState } from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, StyleSheet, SafeAreaView, Alert
} from 'react-native';

const SKILLS = [
  { name: 'React', pct: 72, color: '#7c5cfc', icon: '⚛️' },
  { name: 'Design', pct: 45, color: '#fc5c7d', icon: '🎨' },
  { name: 'Cooking', pct: 61, color: '#fbbf24', icon: '🍳' },
  { name: 'Math', pct: 28, color: '#38bdf8', icon: '📐' },
  { name: 'Language', pct: 15, color: '#4ade80', icon: '🌍' },
];

const ACHIEVEMENTS = [
  { icon: '🔥', label: '14-day streak', unlocked: true },
  { icon: '⚡', label: 'Speed learner', unlocked: true },
  { icon: '🎯', label: 'First save', unlocked: true },
  { icon: '🏆', label: 'Top 10%', unlocked: true },
  { icon: '🌙', label: 'Night owl', unlocked: false },
  { icon: '💎', label: '100 videos', unlocked: false },
  { icon: '🚀', label: 'Level 10', unlocked: false },
  { icon: '👑', label: 'Master', unlocked: false },
];

const ACTIVITY = [
  { day: 'Mon', done: true },
  { day: 'Tue', done: true },
  { day: 'Wed', done: true },
  { day: 'Thu', done: true },
  { day: 'Fri', done: true },
  { day: 'Sat', done: true },
  { day: 'Sun', done: false },
];

export default function ProfileScreen({ route, navigation }) {
  const { user } = route?.params || {};
  const [activeTab, setActiveTab] = useState('stats');

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            if (navigation?.getParent) {
              navigation.getParent()?.replace('Login');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.username ? user.username.slice(0, 2).toUpperCase() : 'SK'}
              </Text>
            </View>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>8</Text>
            </View>
          </View>
          <Text style={styles.username}>{user?.username || 'SkillLearner'}</Text>
          <Text style={styles.email}>{user?.email || 'learner@skilltok.com'}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>⭐ Level 8 — Consistent Learner</Text>
          </View>
        </View>

        {/* XP Progress */}
        <View style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpTitle}>⚡ 1,240 / 1,500 XP</Text>
            <Text style={styles.xpSubtitle}>Next: Level 9</Text>
          </View>
          <View style={styles.xpBarBg}>
            <View style={[styles.xpBarFill, { width: '82%' }]} />
          </View>
          <Text style={styles.xpNote}>260 XP to next level</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { num: '1,240', label: 'Total XP', icon: '⚡' },
            { num: '🔥 14', label: 'Day Streak', icon: '' },
            { num: '47', label: 'Videos', icon: '🎬' },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={styles.weekRow}>
            {ACTIVITY.map((d, i) => (
              <View key={i} style={styles.dayWrap}>
                <View style={[styles.daydot, d.done ? styles.daydotActive : styles.daydotInactive]}>
                  {d.done && <Text style={{ fontSize: 10 }}>✓</Text>}
                </View>
                <Text style={styles.dayLabel}>{d.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabRow}>
          {['stats', 'achievements'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'stats' ? '📊 Skills' : '🏆 Badges'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Skills Tab */}
        {activeTab === 'stats' && (
          <View style={styles.section}>
            {SKILLS.map(skill => (
              <View key={skill.name} style={styles.skillRow}>
                <View style={styles.skillHeader}>
                  <View style={styles.skillNameRow}>
                    <Text style={styles.skillIcon}>{skill.icon}</Text>
                    <Text style={styles.skillName}>{skill.name}</Text>
                  </View>
                  <Text style={[styles.skillPct, { color: skill.color }]}>{skill.pct}%</Text>
                </View>
                <View style={styles.progressBg}>
                  <View style={[
                    styles.progressFill,
                    { width: skill.pct + '%', backgroundColor: skill.color }
                  ]} />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <View style={styles.section}>
            <Text style={styles.achCount}>
              {ACHIEVEMENTS.filter(a => a.unlocked).length}/{ACHIEVEMENTS.length} unlocked
            </Text>
            <View style={styles.achGrid}>
              {ACHIEVEMENTS.map((a, i) => (
                <View key={i} style={[styles.achBadge, !a.unlocked && styles.achLocked]}>
                  <Text style={styles.achIcon}>{a.icon}</Text>
                  <Text style={styles.achLabel}>{a.label}</Text>
                  {!a.unlocked && <Text style={styles.achLockIcon}>🔒</Text>}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Sign Out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },

  profileHeader: { alignItems: 'center', padding: 24, paddingBottom: 16 },
  avatarWrap: { position: 'relative', marginBottom: 14 },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: '#7c5cfc25', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#7c5cfc'
  },
  avatarText: { color: '#7c5cfc', fontSize: 30, fontWeight: '900' },
  avatarBadge: {
    position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#7c5cfc', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#0a0a0f'
  },
  avatarBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },

  username: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 4 },
  email: { color: '#4a4a6a', fontSize: 14, marginBottom: 12 },
  levelBadge: {
    backgroundColor: '#7c5cfc15', borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 7, borderWidth: 1, borderColor: '#7c5cfc30'
  },
  levelText: { color: '#a78bfa', fontSize: 13, fontWeight: '600' },

  xpCard: {
    backgroundColor: '#12121c', borderRadius: 16, marginHorizontal: 16,
    padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1e1e2e'
  },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  xpTitle: { color: '#fff', fontWeight: '700', fontSize: 15 },
  xpSubtitle: { color: '#4a4a6a', fontSize: 13 },
  xpBarBg: { height: 8, backgroundColor: '#1a1a28', borderRadius: 4, marginBottom: 6 },
  xpBarFill: { height: 8, borderRadius: 4, backgroundColor: '#7c5cfc' },
  xpNote: { color: '#4a4a6a', fontSize: 12 },

  statsRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: '#12121c', borderRadius: 14, padding: 14,
    alignItems: 'center', borderWidth: 1, borderColor: '#1e1e2e', marginHorizontal: 4
  },
  statNum: { color: '#fff', fontSize: 20, fontWeight: '900', marginBottom: 4 },
  statLabel: { color: '#4a4a6a', fontSize: 11, fontWeight: '500' },

  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: {
    color: '#4a4a6a', fontSize: 11, textTransform: 'uppercase',
    letterSpacing: 1.5, marginBottom: 14, fontWeight: '600'
  },

  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayWrap: { alignItems: 'center' },
  daydot: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center',
    justifyContent: 'center', marginBottom: 6
  },
  daydotActive: { backgroundColor: '#7c5cfc', shadowColor: '#7c5cfc', shadowOpacity: 0.5, shadowRadius: 8 },
  daydotInactive: { backgroundColor: '#1e1e2e', borderWidth: 1, borderColor: '#2a2a3e' },
  dayLabel: { color: '#4a4a6a', fontSize: 11 },

  tabRow: {
    flexDirection: 'row', marginHorizontal: 16, marginBottom: 16,
    backgroundColor: '#12121c', borderRadius: 14, padding: 4,
    borderWidth: 1, borderColor: '#1e1e2e'
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  tabActive: { backgroundColor: '#7c5cfc' },
  tabText: { color: '#4a4a6a', fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#fff' },

  skillRow: { marginBottom: 16 },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  skillNameRow: { flexDirection: 'row', alignItems: 'center' },
  skillIcon: { fontSize: 16, marginRight: 8 },
  skillName: { color: '#fff', fontSize: 14, fontWeight: '600' },
  skillPct: { fontSize: 13, fontWeight: '800' },
  progressBg: { height: 6, backgroundColor: '#1e1e2e', borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },

  achCount: { color: '#4a4a6a', fontSize: 12, marginBottom: 12 },
  achGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  achBadge: {
    backgroundColor: '#12121c', borderRadius: 14, padding: 14,
    alignItems: 'center', width: '30%', borderWidth: 1, borderColor: '#1e1e2e',
    position: 'relative'
  },
  achLocked: { opacity: 0.35 },
  achIcon: { fontSize: 26, marginBottom: 6 },
  achLabel: { color: '#7a7a9a', fontSize: 10, textAlign: 'center', fontWeight: '500' },
  achLockIcon: { position: 'absolute', top: 6, right: 6, fontSize: 10 },

  logoutBtn: {
    marginHorizontal: 16, marginBottom: 32, backgroundColor: '#fc5c7d15',
    borderRadius: 14, padding: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#fc5c7d30'
  },
  logoutText: { color: '#fc5c7d', fontWeight: '700', fontSize: 15 },
});
