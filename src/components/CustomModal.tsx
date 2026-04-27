import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface StatusModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'error' | 'success';
}

const StatusModal: React.FC<StatusModalProps> = ({visible , title, message, onClose, type = 'error' }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: '80%',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 25,
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
          <Text style={{
            fontSize: 18,
            fontFamily: 'Poppins-Bold',
            marginBottom: 10,
            color: type === 'error' ? '#d32f2f' : '#0ea242'
          }}>
            {title }
          </Text>

          <Text style={{
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: '#444',
            textAlign: 'center',
            marginBottom: 20,
          }}>
            {message}
          </Text>
          
          <TouchableOpacity 
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 10,
              backgroundColor: type === 'error' ? '#d32f2f' : '#0ea242',
            }} 
            onPress={onClose}
          >
            <Text style={{
              color: 'white',
              fontFamily: 'Poppins-Medium',
            }}>
              OK
            </Text>
          </TouchableOpacity>   
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;