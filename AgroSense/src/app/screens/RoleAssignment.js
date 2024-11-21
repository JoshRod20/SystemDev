import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Picker } from "react-native";

const RoleAssignment = ({ user, roles, onAssignRole }) => {
  const [selectedRole, setSelectedRole] = useState(user.rol);

  const handleAssignRole = () => {
    onAssignRole(user.id, selectedRole);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Rol</Text>
      <Text style={styles.subtitle}>Usuario: {user.nombre}</Text>

      <Picker
        selectedValue={selectedRole}
        onValueChange={(value) => setSelectedRole(value)}
        style={styles.picker}
      >
        {roles.map((role) => (
          <Picker.Item key={role} label={role} value={role} />
        ))}
      </Picker>

      <TouchableOpacity onPress={handleAssignRole} style={styles.assignButton}>
        <Text style={styles.buttonText}>Asignar Rol</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  picker: { height: 50, width: "100%" },
  assignButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default RoleAssignment;
