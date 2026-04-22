import { useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView
} from 'react-native';

const ALL_VIDEOS = [
  { _id: '1', title: 'Build a REST API in 15 minutes', category: 'Coding', difficulty: 'beginner', author: 'CodeWithMosh', xp: 50 },
  { _id: '2', title: 'CSS Grid Complete Guide', category: 'Design', difficulty: 'intermediate', author: 'Traversy Media', xp: 75 },
  { _id: '3', title: 'Perfect Sushi Rice Recipe', category: 'Cooking', difficulty: 'beginner', author: 'JapaneseFood', xp: 40 },
  { _id: '4', title: 'React Hooks Explained', category: 'Coding', difficulty: 'intermediate', author: 'WebDevSimplified', xp: 80 },
  { _id: '5', title: 'Learn Figma in 30 minutes', category: 'Design', difficulty: 'beginner', author: 'DesignCourse', xp: 55 },
  { _id: '6', title: 'Python in 100 seconds', category: 'Coding', difficulty: 'beginner', author: 'Fireship', xp: 45 },
  { _id: '7', title: 'Spanish for Beginners', category: 'Language', difficulty: 'beginner', author: 'LanguageNow', xp: 60 },
  { _id: '8', title: 'Music Theory Basics', category: 'Music', difficulty: 'beginner', author: 'MusicTutor', xp: 50 },
];

const TRENDING = ['React', 'Python', 'Design', 'Cooking', 'Music'];

const CATEGORIES = [
  { name: 'Coding', icon: '💻', color: '#7c5cfc' },
  { name: 'Design', icon: '🎨', color: '#fc5c7d' },
  { name: 'Cooking', icon: '🍳', color: '#fbbf24' },
  { name: 'Language', icon: '🌍', color: '#4ade80' },
  { name: 'Music', icon: '🎵', color: '#38bdf8' },
  { name: 'Math', icon: '📐', color: '#f97316' },
];

const diffColor = (d) => d === 'beginner' ? '#4ade80' : d === 'intermediate' ? '#fbbf24' : '#fc5c7d';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const r = ALL_VIDEOS.filter(v =>
        v.title.toLowerCase().includes(text.toLowerCase()) ||
        v.author.toLowerCase().includes(text.toLowerCase()) ||
        v.category.toLowerCase().includes(text.toLowerCase())
      );
      setResults(r);
      setSearched(true);
    } else {
      setSearched(false);
    }
  };

  const searchByCategory = (cat) => handleSearch(cat);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos, topics, creators..."
            placeholderTextColor="#4a4a6a"
            value={query}
            onChangeText={handleSearch}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setSearched(false); }}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!searched ? (
        <FlatList
          data={[]}
          ListHeaderComponent={() => (
            <View>
              {/* Trending */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔥 Trending Searches</Text>
                <View style={styles.trendingWrap}>
                  {TRENDING.map(t => (
                    <TouchableOpacity key={t} style={styles.trendChip} onPress={() => handleSearch(t)}>
                      <Text style={styles.trendText}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Categories */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Browse Categories</Text>
                <View style={styles.catGrid}>
                  {CATEGORIES.map(cat => (
                    <TouchableOpacity
                      key={cat.name}
                      style={[styles.catCard, { borderColor: cat.color + '40' }]}
                      onPress={() => searchByCategory(cat.name)}
                    >
                      <Text style={styles.catIcon}>{cat.icon}</Text>
                      <Text style={[styles.catName, { color: cat.color }]}>{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
          renderItem={() => null}
        />
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeader}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </Text>
          <FlatList
            data={results}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultCard}>
                <View style={styles.resultLeft}>
                  <View style={[styles.resultIcon, { backgroundColor: '#7c5cfc20' }]}>
                    <Text style={{ fontSize: 20 }}>
                      {item.category === 'Coding' ? '💻' :
                       item.category === 'Design' ? '🎨' :
                       item.category === 'Cooking' ? '🍳' :
                       item.category === 'Language' ? '🌍' :
                       item.category === 'Music' ? '🎵' : '📚'}
                    </Text>
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.resultAuthor}>{item.author}</Text>
                  </View>
                </View>
                <View style={styles.resultRight}>
                  <View style={[styles.diffTag, { borderColor: diffColor(item.difficulty) }]}>
                    <Text style={[styles.diffTagText, { color: diffColor(item.difficulty) }]}>
                      {item.difficulty}
                    </Text>
                  </View>
                  <Text style={styles.xpTag}>+{item.xp} XP</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>No results found</Text>
                <Text style={styles.emptySubText}>Try different keywords</Text>
              </View>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  header: { padding: 16 },
  title: { color: '#fff', fontSize: 28, fontWeight: '900', marginBottom: 14, letterSpacing: -1 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a28',
    borderRadius: 16, borderWidth: 1, borderColor: '#2a2a3e', paddingHorizontal: 14
  },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 14, fontSize: 15 },
  clearBtn: { color: '#4a4a6a', fontSize: 18, paddingHorizontal: 6 },

  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 14 },

  trendingWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  trendChip: {
    backgroundColor: '#12121c', borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 8, borderWidth: 1, borderColor: '#1e1e2e'
  },
  trendText: { color: '#a78bfa', fontSize: 13, fontWeight: '600' },

  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard: {
    width: '47%', backgroundColor: '#12121c', borderRadius: 16, padding: 16,
    alignItems: 'center', borderWidth: 1
  },
  catIcon: { fontSize: 32, marginBottom: 8 },
  catName: { fontWeight: '700', fontSize: 14 },

  resultsContainer: { flex: 1, paddingHorizontal: 16 },
  resultsHeader: { color: '#4a4a6a', fontSize: 13, marginBottom: 12 },
  resultCard: {
    backgroundColor: '#12121c', borderRadius: 16, padding: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#1e1e2e'
  },
  resultLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  resultIcon: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  resultInfo: { flex: 1 },
  resultTitle: { color: '#fff', fontWeight: '700', fontSize: 14, marginBottom: 4 },
  resultAuthor: { color: '#4a4a6a', fontSize: 12 },
  resultRight: { alignItems: 'flex-end', marginLeft: 10 },
  diffTag: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, marginBottom: 4 },
  diffTagText: { fontSize: 10, fontWeight: '600' },
  xpTag: { color: '#fbbf24', fontSize: 11, fontWeight: '700' },

  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  emptySubText: { color: '#4a4a6a', fontSize: 14 },
});
