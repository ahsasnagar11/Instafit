import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CartScreen = () => {
  // Cart items with quantities
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Item 1', price: 20, quantity: 1 },
    { id: '2', name: 'Item 2', price: 30, quantity: 2 },
    { id: '3', name: 'Item 3', price: 50, quantity: 1 },
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle item quantity change
  const changeQuantity = (id, type) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: type === 'increment' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => changeQuantity(item.id, 'decrement')}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.itemText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => changeQuantity(item.id, 'increment')}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemText}>${item.price * item.quantity}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${totalPrice}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CartScreen;
