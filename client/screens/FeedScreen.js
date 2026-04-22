import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  TextInput, ActivityIndicator
} from 'react-native';

const CATEGORIES = ['All', 'Coding', 'Design', 'Cooking', 'Math', 'Language', 'Business', 'Music'];

const VIDEOS = [
  { _id: '1', title: 'Build a REST API in 15 minutes', category: 'Coding', difficulty: 'beginner', author: 'CodeWithMosh', views: '24.2K', likes: '1.8K', youtubeId: 'pKd0Rpw7O48', xp: 50 },
  { _id: '2', title: 'CSS Grid Complete Guide', category: 'Design', difficulty: 'intermediate', author: 'Traversy Media', views: '18.1K', likes: '2.1K', youtubeId: 'jV8B24rSN5o', xp: 75 },
  { _id: '3', title: 'Perfect Sushi Rice Recipe', category: 'Cooking', difficulty: 'beginner', author: 'JapaneseFood', views: '41.3K', likes: '5.2K', youtubeId: 'T4cHCGMrMC0', xp: 40 },
  { _id: '4', title: 'React Hooks Explained', category: 'Coding', difficulty: 'intermediate', author: 'WebDevSimplified', views: '32K', likes: '3.4K', youtubeId: 'TNhaISOUy6Q', xp: 80 },
  { _id: '5', title: 'Learn Figma in 30 minutes', category: 'Design', difficulty: 'beginner', author: 'DesignCourse', views: '22K', likes: '2.6K', youtubeId: 'FTFaQWZBqQ8', xp: 55 },
  { _id: '6', title: 'Python in 100 seconds', category: 'Coding', difficulty: 'beginner', author: 'Fireship', views: '27.5K', likes: '3.1K', youtubeId: 'x7X9w_GIm1s', xp: 45 },
  { _id: '7', title: 'Spanish for Beginners', category: 'Language', difficulty: 'beginner', author: 'LanguageNow', views: '19K', likes: '1.9K', youtubeId: 'FXhkJOWjkbc', xp: 60 },
  { _id: '8', title: 'Music Theory Basics', category: 'Music', difficulty: 'beginner', author: 'MusicTutor', views: '15K', likes: '1.4K', youtubeId: 'rgaTLrZGlk0', xp: 50 },
];

const diffColor = (d) => d === 'beginner' ? '#4ade80' : d === 'intermediate' ? '#fbbf24' : '#fc5c7d';
const diffEmoji = (d) => d === 'beginner' ? '🟢' : d === 'intermediate' ? '🟡' : '🔴';

export default function FeedScreen({ route }) {
  const { user } = route?.params || {};
  const [activeCat, setActiveCat] = useState('All');
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [watched, setWatched] = useState({});
  const [search, setSearch] = useState('');
  const [totalXP, setTotalXP] = useState(120);

  const filtered = VIDEOS.filter(v => {
    const matchCat = activeCat === 'All' || v.category === activeCat;
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleWatch = (item) => {
    if (!watched[item._id]) {
      setWatched(prev => ({ ...prev, [item._id]: true }));
      setTotalXP(prev => prev + item.xp);
    }
  };

  const renderVideo = ({ item }) => (
    <View style={styles.videoCard}>
      {/* Embed */}
      <View style={styles.embedContainer}>
        <iframe
          width="100%"
          height="220"
          src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'block', borderRadius: 0 }}
          onLoad={() => handleWatch(item)}
          title={item.title}
        />
        {watched[item._id] && (
          <View style={styles.watchedBadge}>
            <Text style={styles.watchedText}>✓ Watched</Text>
          </View>
        )}
      </View>

      <View style={styles.cardBody}>
        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={styles.catBadge}>
            <Text style={styles.catText}>{item.category}</Text>
          </View>
          <View style={[styles.diffBadge, { borderColor: diffColor(item.difficulty) }]}>
            <Text style={[styles.diffText, { color: diffColor(item.difficulty) }]}>
              {diffEmoji(item.difficulty)} {item.difficulty}
            </Text>
          </View>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{item.xp} XP</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.videoTitle}>{item.title}</Text>

        {/* Author row */}
        <View style={styles.authorRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.author.slice(0, 2).toUpperCase()}</Text>
          </View>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.stat}>▶ {item.views}</Text>
          <Text style={styles.stat}>♥ {item.likes}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, liked[item._id] && styles.actionLiked]}
            onPress={() => setLiked(prev => ({ ...prev, [item._id]: !prev[item._id] }))}
          >
            <Text style={styles.actionText}>{liked[item._id] ? '♥ Liked' : '♡ Like'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, saved[item._id] && styles.actionSaved]}
            onPress={() => setSaved(prev => ({ ...prev, [item._id]: !prev[item._id] }))}
          >
            <Text style={styles.actionText}>{saved[item._id] ? '🔖 Saved' : '+ Save'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>↗ Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLogo}>
            Skill<Text style={{ color: '#7c5cfc' }}>Tok</Text>
          </Text>
          <Text style={styles.greetText}>
            {user?.username ? `Hey, ${user.username}! 👋` : 'Welcome back! 👋'}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.xpBox}>
            <Text style={styles.xpBoxText}>⚡ {totalXP} XP</Text>
          </View>
          <View style={styles.streakBox}>
            <Text style={styles.streakText}>🔥 14</Text>
          </View>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search videos, topics..."
          placeholderTextColor="#4a4a6a"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ color: '#4a4a6a', fontSize: 18, paddingRight: 8 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catPill, activeCat === cat && styles.catPillActive]}
            onPress={() => setActiveCat(cat)}
          >
            <Text style={[styles.catPillText, activeCat === cat && styles.catPillTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results count */}
      {search.length > 0 && (
        <Text style={styles.resultCount}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
        </Text>
      )}

      {/* Feed */}
      <FlatList
        data={filtered}
        renderItem={renderVideo}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎬</Text>
            <Text style={styles.emptyText}>No videos found</Text>
            <Text style={styles.emptySubText}>Try a different category or search</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', padding: 16, paddingBottom: 10
  },
  headerLogo: { fontSize: 26, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  greetText: { color: '#4a4a6a', fontSize: 12, marginTop: 2 },
  headerRight: { flexDirection: 'row', gap: 8 },
  xpBox: {
    backgroundColor: '#7c5cfc20', borderRadius: 20, paddingHorizontal: 12,
    paddingVertical: 6, borderWidth: 1, borderColor: '#7c5cfc40'
  },
  xpBoxText: { color: '#a78bfa', fontWeight: '700', fontSize: 13 },
  streakBox: {
    backgroundColor: '#fbbf2420', borderRadius: 20, paddingHorizontal: 12,
    paddingVertical: 6, borderWidth: 1, borderColor: '#fbbf2440'
  },
  streakText: { color: '#fbbf24', fontWeight: '700', fontSize: 13 },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a28',
    borderRadius: 14, borderWidth: 1, borderColor: '#2a2a3e',
    marginHorizontal: 16, marginBottom: 12, paddingLeft: 14
  },
  searchIcon: { fontSize: 15, marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 12, fontSize: 14 },

  catScroll: { paddingHorizontal: 12, marginBottom: 8, maxHeight: 44 },
  catPill: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: '#2a2a3e', marginRight: 8, height: 36
  },
  catPillActive: { backgroundColor: '#7c5cfc', borderColor: '#7c5cfc' },
  catPillText: { color: '#7a7a9a', fontSize: 13 },
  catPillTextActive: { color: '#fff', fontWeight: '600' },

  resultCount: { color: '#4a4a6a', fontSize: 12, paddingHorizontal: 16, marginBottom: 8 },

  videoCard: {
    backgroundColor: '#12121c', borderRadius: 20, marginHorizontal: 12,
    marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#1e1e2e'
  },
  embedContainer: { width: '100%', height: 220, position: 'relative', backgroundColor: '#0a0a0f' },
  watchedBadge: {
    position: 'absolute', top: 8, right: 8, backgroundColor: '#4ade8090',
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4
  },
  watchedText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  cardBody: { padding: 14 },
  tagsRow: { flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap', gap: 6 },
  catBadge: {
    backgroundColor: '#7c5cfc25', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, borderColor: '#7c5cfc40'
  },
  catText: { color: '#a78bfa', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  diffText: { fontSize: 11, fontWeight: '600' },
  xpBadge: {
    backgroundColor: '#fbbf2420', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, borderColor: '#fbbf2440'
  },
  xpText: { color: '#fbbf24', fontSize: 11, fontWeight: '700' },

  videoTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 12, lineHeight: 22 },

  authorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: '#7c5cfc30',
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
    borderWidth: 1, borderColor: '#7c5cfc50'
  },
  avatarText: { color: '#a78bfa', fontSize: 10, fontWeight: '800' },
  authorName: { color: 'rgba(255,255,255,0.65)', fontSize: 13, flex: 1 },
  stat: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginLeft: 10 },

  actionRow: { flexDirection: 'row', gap: 6 },
  actionBtn: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10,
    padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#2a2a3e'
  },
  actionLiked: { backgroundColor: '#fc5c7d20', borderColor: '#fc5c7d50' },
  actionSaved: { backgroundColor: '#7c5cfc20', borderColor: '#7c5cfc50' },
  actionText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  emptySubText: { color: '#4a4a6a', fontSize: 14 },
});
