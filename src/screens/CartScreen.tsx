import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CustomHeader from '../components/CustomHeader'
import { RootState, Product } from '../utils/types'
import { REMOVE_FROM_CART, CLEAR_CART } from '../App/actions'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')

const CartScreen = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.auth.cart)
  
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [itemToDelete, setItemToDelete] = React.useState<number | null>(null)

  const handleRemove = (id: number) => {
    setItemToDelete(id)
    setDeleteModalVisible(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      dispatch({ type: REMOVE_FROM_CART, payload: itemToDelete })
    }
    setDeleteModalVisible(false)
    setItemToDelete(null)
  }

  const handleClear = () => {
    dispatch({ type: CLEAR_CART })
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginHorizontal: 20,
      marginVertical: 8,
      borderRadius: 15,
      padding: 12,
      elevation: 2,
      alignItems: 'center'
    }}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/100' }}
        style={{ width: 80, height: 80, borderRadius: 10 }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f3a03' }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: '#48bf24', fontWeight: 'bold', marginTop: 4 }}>
          ₱{item.price} {item.quantity && item.quantity > 1 ? `x${item.quantity}` : ''}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ef4444" />
      </TouchableOpacity>
    </View>
  )

  const EmptyState = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
      <Ionicons name="cart-outline" size={90} color="#0a693a51" />
      <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold', color: '#064f23', marginTop: 20 }}>Your cart is empty</Text>
      <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', color: '#054f02', marginTop: 10, textAlign: 'center', paddingHorizontal: 40 }}>
        Looks like you haven't added anything to your cart yet.
      </Text>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <CustomHeader showWelcome />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginVertical: 10 }}>
        {cart.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={{ color: '#ef4444', fontFamily: 'Poppins-Medium' }}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + index}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {cart.length > 0 && (
        <View style={{
          position: 'absolute',
          bottom: 80,
          left: 20,
          right: 20,
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 15,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <Text style={{ fontSize: 14, color: '#64748b' }}>Total:</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0f3a03' }}>
              ₱{cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0)}
            </Text>
          </View>
          <TouchableOpacity style={{
            backgroundColor: '#16a34a',
            padding: 15,
            borderRadius: 14,
            alignItems: 'center'
          }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        transparent={true}
        visible={deleteModalVisible}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <Pressable 
          onPress={() => setDeleteModalVisible(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#0f3a03', fontFamily: 'Poppins-Bold' }}>Remove Item</Text>
            <Text style={{ color: '#64748b', marginBottom: 20, textAlign: 'center', fontFamily: 'Poppins-Regular' }}>
              Are you sure you want to remove this item from your cart?
            </Text>
            
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity 
                onPress={() => setDeleteModalVisible(false)}
                style={{ flex: 1, padding: 12, backgroundColor: '#e2e8f0', borderRadius: 8, alignItems: 'center' }}
              >
                <Text style={{ fontWeight: '600', color: '#475569', fontFamily: 'Poppins-Medium' }}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleConfirmDelete}
                style={{ flex: 1, padding: 12, backgroundColor: '#ef4444', borderRadius: 8, alignItems: 'center' }}
              >
                <Text style={{ fontWeight: '600', color: '#fff', fontFamily: 'Poppins-Medium' }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default CartScreen