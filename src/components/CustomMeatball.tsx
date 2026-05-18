import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../utils/AuthContext';

interface CustomMeatballProps {
    onQrPress?: () => void;
    onHomePress?: () => void;
    onCartPress?: () => void;
    onCoursesPress?: () => void;
}

const CustomMeatball = ({ onQrPress, onHomePress, onCartPress, onCoursesPress }: CustomMeatballProps) => {
    const { logout } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogoutConfirm = () => {
        setModalVisible(false);
        setMenuVisible(false);
        logout();
    };

    const handlePress = (callback?: () => void) => {
        if (callback) {
            callback();
        }
        setMenuVisible(false);
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, zIndex: 10, marginBottom: 20, paddingTop: 10 }}>
            <TouchableOpacity onPress={onQrPress}>
                <Ionicons name="qr-code-outline" size={24} color="#1e293b" />
            </TouchableOpacity>

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
                        width: 160,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        zIndex: 100,
                    }}>
                        <TouchableOpacity 
                            onPress={() => handlePress(onHomePress)}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}
                        >
                            <Text style={{ color: '#475569', fontSize: 13 }}>Home</Text>
                            <Ionicons name="home-outline" size={16} color="#64748b" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => handlePress(onCartPress)}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}
                        >
                            <Text style={{ color: '#475569', fontSize: 13 }}>Cart</Text>
                            <Ionicons name="cart-outline" size={16} color="#64748b" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => handlePress(onCoursesPress)}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}
                        >
                            <Text style={{ color: '#475569', fontSize: 13 }}>Courses</Text>
                            <Ionicons name="book-outline" size={16} color="#64748b" />
                        </TouchableOpacity>

                        <View style={{ height: 1, backgroundColor: '#e2e8f0', marginVertical: 4 }} />

                        <TouchableOpacity 
                            onPress={() => setModalVisible(true)}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}
                        >
                            <Text style={{ color: '#ef4444', fontSize: 13 }}>Logout</Text>
                            <Ionicons name="power-outline" size={16} color="#ef4444" />
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