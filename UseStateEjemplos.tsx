import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Switch,
  StatusBar,
} from 'react-native';

// ─────────────────────────────────────────────
//  Ejemplo 1: Contador simple
// ─────────────────────────────────────────────
function EjemploContador() {
  const [contador, setContador] = useState<number>(0);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>📦 Ejemplo 1 — Número</Text>
      <Text style={styles.cardDesc}>
        <Text style={styles.code}>useState(0)</Text> guarda un número
      </Text>
      <Text style={styles.bigNumber}>{contador}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => setContador(contador - 1)}>
          <Text style={styles.btnSecondaryText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => setContador(0)}>
          <Text style={styles.btnSecondaryText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => setContador(contador + 1)}>
          <Text style={styles.btnPrimaryText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Ejemplo 2: Texto / Input
// ─────────────────────────────────────────────
function EjemploTexto() {
  const [nombre, setNombre] = useState<string>('');

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>📝 Ejemplo 2 — Texto</Text>
      <Text style={styles.cardDesc}>
        <Text style={styles.code}>useState("")</Text> guarda lo que escribes
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre..."
        placeholderTextColor="#64748B"
        value={nombre}
        onChangeText={(val) => setNombre(val)}
      />
      {nombre.length > 0 && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Estado actual:</Text>
          <Text style={styles.resultValue}>"{nombre}"</Text>
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────
//  Ejemplo 3: Booleano (Switch)
// ─────────────────────────────────────────────
function EjemploBooleano() {
  const [activo, setActivo] = useState<boolean>(false);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>🔘 Ejemplo 3 — Booleano</Text>
      <Text style={styles.cardDesc}>
        <Text style={styles.code}>useState(false)</Text> guarda true o false
      </Text>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Modo oscuro</Text>
        <Switch
          value={activo}
          onValueChange={(val) => setActivo(val)}
          trackColor={{ false: '#334155', true: '#6366F1' }}
          thumbColor={activo ? '#fff' : '#94A3B8'}
        />
      </View>
      <View style={[styles.resultBox, activo ? styles.resultActive : styles.resultInactive]}>
        <Text style={styles.resultValue}>
          {activo ? '✅ activo = true' : '❌ activo = false'}
        </Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Ejemplo 4: Objeto
// ─────────────────────────────────────────────
function EjemploObjeto() {
  const [usuario, setUsuario] = useState<{ nombre: string; edad: number }>({
    nombre: 'Ana',
    edad: 25,
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>🗂 Ejemplo 4 — Objeto</Text>
      <Text style={styles.cardDesc}>
        <Text style={styles.code}>useState({'{}'})</Text> guarda múltiples valores
      </Text>
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Estado actual:</Text>
        <Text style={styles.resultValue}>
          nombre: "{usuario.nombre}" {'\n'}edad: {usuario.edad}
        </Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => setUsuario({ ...usuario, nombre: 'Carlos' })}
        >
          <Text style={styles.btnSecondaryText}>Cambiar nombre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => setUsuario({ ...usuario, edad: usuario.edad + 1 })}
        >
          <Text style={styles.btnPrimaryText}>+1 año</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Ejemplo 5: Array / Lista
// ─────────────────────────────────────────────
function EjemploArray() {
  const [tareas, setTareas] = useState<string[]>(['Aprender React Native']);
  const [nueva, setNueva] = useState<string>('');

  const agregar = () => {
    if (nueva.trim()) {
      setTareas([...tareas, nueva.trim()]);
      setNueva('');
    }
  };

  const eliminar = (index: number) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>📋 Ejemplo 5 — Array</Text>
      <Text style={styles.cardDesc}>
        <Text style={styles.code}>useState([])</Text> guarda una lista de items
      </Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Nueva tarea..."
          placeholderTextColor="#64748B"
          value={nueva}
          onChangeText={setNueva}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={agregar}>
          <Text style={styles.btnPrimaryText}>＋</Text>
        </TouchableOpacity>
      </View>
      {tareas.map((tarea, index) => (
        <View key={index} style={styles.tareaRow}>
          <Text style={styles.tareaText}>• {tarea}</Text>
          <TouchableOpacity onPress={() => eliminar(index)}>
            <Text style={styles.tareaEliminar}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────
//  Pantalla principal
// ─────────────────────────────────────────────
export default function UseStateEjemplos() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo}>useState en React Native</Text>
        <Text style={styles.subtitulo}>
          useState(valorInicial) devuelve{'\n'}
          <Text style={styles.code}>[estado, setEstado]</Text>
        </Text>

        <EjemploContador />
        <EjemploTexto />
        <EjemploBooleano />
        <EjemploObjeto />
        <EjemploArray />

        <View style={styles.resumen}>
          <Text style={styles.resumenTitulo}>💡 Resumen</Text>
          <Text style={styles.resumenTexto}>
            • Nunca modifiques el estado directo{'\n'}
            • Siempre usa <Text style={styles.code}>setEstado()</Text>{'\n'}
            • Cada cambio vuelve a renderizar el componente{'\n'}
            • Para objetos usa el spread: <Text style={styles.code}>{'...estado'}</Text>
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

// ─────────────────────────────────────────────
//  Estilos
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contenido: {
    padding: 20,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F1F5F9',
    marginTop: 50,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 28,
    lineHeight: 22,
  },

  // Card
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#A78BFA',
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  // Contador
  bigNumber: {
    fontSize: 56,
    fontWeight: '800',
    color: '#6366F1',
    textAlign: 'center',
    marginVertical: 8,
  },

  // Botones
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 15,
  },
  btnAdd: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Input
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#F1F5F9',
    marginBottom: 12,
  },

  // Result
  resultBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  resultActive: {
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  resultInactive: {
    borderWidth: 1,
    borderColor: '#334155',
  },
  resultLabel: {
    fontSize: 11,
    color: '#475569',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultValue: {
    fontSize: 14,
    color: '#A78BFA',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // Switch
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchLabel: {
    color: '#94A3B8',
    fontSize: 15,
  },

  // Tareas
  tareaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  tareaText: {
    color: '#CBD5E1',
    fontSize: 14,
    flex: 1,
  },
  tareaEliminar: {
    color: '#EF4444',
    fontSize: 14,
    paddingLeft: 12,
  },

  // Resumen
  resumen: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  resumenTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 10,
  },
  resumenTexto: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 24,
  },
});

// Necesario para usar Platform en estilos
import { Platform } from 'react-native';
