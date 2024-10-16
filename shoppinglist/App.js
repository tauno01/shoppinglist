import { Button, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { addDoc, collection, firestore, ITEMS, query, onSnapshot, deleteDoc, doc } from './firebase/Config';
import { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, ITEMS))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempItems = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempItems.push({...doc.data(), id: doc.id})
      })
      setItems(tempItems)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, ITEMS), {
      text: newItem
    }).catch(error => console.log(error))
    setNewItem('')
  }

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, ITEMS, id))
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping list</Text>
      <TextInput 
        placeholder='Add new item...'
        value={newItem}
        onChangeText={text => setNewItem(text)}
      />
      <Button title='Save' onPress={save} />
      <ScrollView>
        {
          items.map((item) => (
            <View key={item.id} style={styles.jotain}>
              <Text>{item.text}</Text>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <MaterialIcons name="delete" size={24} />
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 80
  }, title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }, form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16
  }, message: {
    margin: 10,
    padding: 10,
  }, jotain: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
