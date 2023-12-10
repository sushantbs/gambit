import React, {useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {PrimaryButton, SecondaryButton} from './Buttons';

interface OverlayPickerProps {
  visible: boolean;
  items: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  onCancel: () => void;
}

export const OverlayPicker: React.FC<OverlayPickerProps> = ({
  visible,
  items,
  selectedValue,
  onChange,
  onCancel,
}) => {
  const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue);

  const handleConfirm = () => {
    onChange(tempSelectedValue);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Picker
            selectedValue={tempSelectedValue}
            onValueChange={itemValue => setTempSelectedValue(itemValue)}
            style={styles.picker}>
            {items.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
          <View style={{...styles.buttonContainer}}>
            <PrimaryButton title="Confirm" onPress={handleConfirm} />
            <SecondaryButton title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  picker: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexBasis: 60,
    width: 200,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
