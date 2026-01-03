import { Modal, View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

const BACKEND_URL = 'http://192.168.8.125:3000';

export default function NewInvestmentModal({ visible, onClose, onAdd }: any) {
  const [farmer_name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [crop, setCrop] = useState('');

  const submit = async () => {
    if (!farmer_name || !amount || !crop) return;

    const temp = {
      id: Date.now(),
      farmer_name,
      amount,
      crop,
      created_at: new Date().toISOString(),
    };

    onAdd(temp);
    onClose();

    try {
      const res = await fetch(`${BACKEND_URL}/api/investments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmer_name, amount, crop }),
      });
      if (!res.ok) throw new Error();
    } catch {}
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>New Investment</Text>

          <TextInput
            placeholder="Farmer Name"
            style={styles.input}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Crop"
            style={styles.input}
            onChangeText={setCrop}
          />
          <TextInput
            placeholder="Amount (Rs)"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setAmount}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={submit}>
            <Text style={styles.saveText}>Save Investment</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancel: {
    textAlign: 'center',
    color: '#888',
    marginTop: 12,
  },
});
