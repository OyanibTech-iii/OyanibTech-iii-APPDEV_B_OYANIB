import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../utils/AuthContext';

const CustomMeatball = () => {
    const { logout} = useContext(AuthContext);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogoutConfirm = () => {
        setModalVisible(false);
        setMenuVisible(false);
        logout();
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, zIndex: 10, marginBottom: 20, paddingTop: 10 }}>
            <Ionicons name="grid-outline" size={24} color="#1e293b" />

            <View style={{ position: 'relative' }}>
                <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#1e293b" />
                </TouchableOpacity>

                {menuVisible && (
                    <View style={{
                        position: 'absolute',
                        right: 0,
                        top: 35,
                        backgroundColor: '#f1f5f9',
                        padding: 10,
                        borderRadius: 8,
                        width: 140,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        zIndex: 100,
                    }}>
                        <TouchableOpacity 
                            onPress={() => setModalVisible(true)}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
                        >
                            <Text style={{ color: 'grey', }}>Logout</Text>
                            <Ionicons name="power-outline" size={16} color="#64748b" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable 
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Confirm Logout</Text>
                        <Text style={{ color: '#64748b', marginBottom: 20, textAlign: 'center' }}>Are you sure you want to log out?</Text>
                        
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)}
                                style={{ flex: 1, padding: 12, backgroundColor: '#e2e8f0', borderRadius: 8, alignItems: 'center' }}
                            >
                                <Text style={{ fontWeight: '600', color: '#475569' }}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={handleLogoutConfirm}
                                style={{ flex: 1, padding: 12, backgroundColor: '#ef4444', borderRadius: 8, alignItems: 'center' }}
                            >
                                <Text style={{ fontWeight: '600', color: '#fff' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default CustomMeatball;