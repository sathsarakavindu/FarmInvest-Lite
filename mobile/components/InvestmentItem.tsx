import { View, Text, StyleSheet } from 'react-native';

export default function InvestmentItem({ item }: any) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.farmer_name}</Text>
        <Text style={styles.amount}>Rs. {item.amount}</Text>
      </View>

      <Text style={styles.crop}>🌾 {item.crop}</Text>
      <Text style={styles.date}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  crop: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    color: '#999',
  },
});
