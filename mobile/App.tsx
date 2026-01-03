import { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import InvestmentItem from './components/InvestmentItem';
import NewInvestmentModal from './components/NewInvestmentModal';



const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/investments`,{method:'GET'});
      const json = await res.json();
      console.log(json);
      setData(json);
      setError('');
    } catch {
      setError('Failed to load investments');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //In loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Loading investments...</Text>
      </View>
    );
  }

 
  return (
    <SafeAreaView style={styles.container}>
      {/* Header (App Bar)*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌱 FarmInvest Lite</Text>
        <Text style={styles.headerSubtitle}>
          Smart farming investment tracker
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* The Card Component */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InvestmentItem item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button (Add Button)*/}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <NewInvestmentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={(item) => setData((prev) => [item, ...prev])}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E8F5E9',
    marginTop: 4,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2E7D32',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#555',
  },
});
