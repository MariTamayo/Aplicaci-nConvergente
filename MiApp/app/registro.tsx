import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { registrarUsuario } from '../services/usuariosApi';

// ─── Tipos ────────────────────────────────────────────────
type FormFields = {
  nombre:            string;
  apellido:          string;
  email:             string;
  telefono:          string;
  password:          string;
  confirmarPassword: string;
};

type CampoProps = {
  label:       string;
  campo:       keyof FormFields;
  placeholder: string;
  teclado?:    'default' | 'email-address' | 'phone-pad' | 'numeric';
  seguro?:     boolean;
};

// ─── Componente principal ─────────────────────────────────
export default function Registro() {
  const [form, setForm] = useState<FormFields>({
    nombre:            '',
    apellido:          '',
    email:             '',
    telefono:          '',
    password:          '',
    confirmarPassword: '',
  });

  const [errores, setErrores]             = useState<Partial<Record<keyof FormFields, string>>>({});
  const [mostrarPassword, setMostrarPassword] = useState<boolean>(false);
  const [cargando, setCargando]           = useState<boolean>(false);

  // ─── Actualizar campo ──────────────────────────────────
  const actualizar = (campo: keyof FormFields, valor: string) => {
    setForm({ ...form, [campo]: valor });
    if (errores[campo]) {
      setErrores({ ...errores, [campo]: undefined });
    }
  };

  // ─── Validaciones locales ──────────────────────────────
  const validar = (): boolean => {
    const nuevosErrores: Partial<Record<keyof FormFields, string>> = {};

    if (!form.nombre.trim())   nuevosErrores.nombre   = 'El nombre es requerido';
    if (!form.apellido.trim()) nuevosErrores.apellido = 'El apellido es requerido';

    if (!form.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nuevosErrores.email = 'Ingresa un email válido';
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (!/^\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido';
    }

    if (!form.password) {
      nuevosErrores.password = 'La contraseña es requerida';
    } else if (form.password.length < 6) {
      nuevosErrores.password = 'Mínimo 6 caracteres';
    }

    if (!form.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Confirma tu contraseña';
    } else if (form.password !== form.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // ─── Enviar al backend ─────────────────────────────────
  const enviar = async () => {
    if (!validar()) return;

    setCargando(true);
    try {
      const usuario = await registrarUsuario(form);
      Alert.alert(
        '¡Registro exitoso! 🎉',
        `Bienvenido, ${usuario.nombre} ${usuario.apellido}\nID: ${usuario.id}`,
        [{ text: 'Continuar' }]
      );
      // Limpiar formulario
      setForm({
        nombre: '', apellido: '', email: '',
        telefono: '', password: '', confirmarPassword: '',
      });
    } catch (error: any) {
      Alert.alert(
        'Error al registrar',
        error.message || 'Ocurrió un error inesperado',
        [{ text: 'Cerrar' }]
      );
    } finally {
      setCargando(false);
    }
  };

  // ─── Componente Campo ──────────────────────────────────
  const Campo = ({
    label,
    campo,
    placeholder,
    teclado = 'default',
    seguro  = false,
  }: CampoProps) => (
    <View style={styles.campoContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, errores[campo] ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={form[campo]}
          onChangeText={(val) => actualizar(campo, val)}
          keyboardType={teclado}
          secureTextEntry={seguro && !mostrarPassword}
          autoCapitalize={campo === 'email' ? 'none' : 'words'}
          editable={!cargando}
        />
        {seguro && (
          <TouchableOpacity
            onPress={() => setMostrarPassword(!mostrarPassword)}
            style={styles.togglePassword}
          >
            <Text style={styles.toggleText}>{mostrarPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {errores[campo] ? (
        <Text style={styles.errorText}>⚠ {errores[campo]}</Text>
      ) : null}
    </View>
  );

  // ─── Render ────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>✦</Text>
          </View>
          <Text style={styles.titulo}>Crear cuenta</Text>
          <Text style={styles.subtitulo}>Únete a nuestra comunidad hoy</Text>
        </View>

        {/* Tarjeta */}
        <View style={styles.tarjeta}>

          <View style={styles.fila}>
            <View style={styles.mitad}>
              <Campo label="Nombre"   campo="nombre"   placeholder="Juan" />
            </View>
            <View style={styles.mitad}>
              <Campo label="Apellido" campo="apellido" placeholder="Pérez" />
            </View>
          </View>

          <Campo
            label="Correo electrónico"
            campo="email"
            placeholder="juan@ejemplo.com"
            teclado="email-address"
          />
          <Campo
            label="Teléfono"
            campo="telefono"
            placeholder="+57 300 000 0000"
            teclado="phone-pad"
          />
          <Campo
            label="Contraseña"
            campo="password"
            placeholder="Mínimo 6 caracteres"
            seguro={true}
          />
          <Campo
            label="Confirmar contraseña"
            campo="confirmarPassword"
            placeholder="Repite tu contraseña"
            seguro={true}
          />

          {/* Botón */}
          <TouchableOpacity
            style={[styles.boton, cargando && styles.botonDeshabilitado]}
            onPress={enviar}
            activeOpacity={0.85}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botonTexto}>Crear cuenta →</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.linea} />
            <Text style={styles.dividerTexto}>o</Text>
            <View style={styles.linea} />
          </View>

          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.linkTexto}>
              ¿Ya tienes cuenta?{' '}
              <Text style={styles.linkAccion}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Al registrarte aceptas nuestros Términos y Política de privacidad
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Estilos ──────────────────────────────────────────────
const styles = StyleSheet.create({
  flex:      { flex: 1 },
  container: { flex: 1, backgroundColor: '#0F172A' },
  contenido: { paddingHorizontal: 20, paddingBottom: 40 },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  logoCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#6366F1',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 10,
  },
  logoText:  { fontSize: 28, color: '#fff' },
  titulo:    { fontSize: 28, fontWeight: '700', color: '#F1F5F9', letterSpacing: -0.5, marginBottom: 6 },
  subtitulo: { fontSize: 15, color: '#64748B' },
  tarjeta: {
    backgroundColor: '#1E293B', borderRadius: 24,
    padding: 24, borderWidth: 1, borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3, shadowRadius: 30, elevation: 15,
  },
  fila:  { flexDirection: 'row', gap: 12 },
  mitad: { flex: 1 },
  campoContainer: { marginBottom: 16 },
  label: {
    fontSize: 13, fontWeight: '600', color: '#94A3B8',
    marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#0F172A', borderRadius: 12,
    borderWidth: 1, borderColor: '#334155',
  },
  inputError:      { borderColor: '#EF4444' },
  input: {
    flex: 1, paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: '#F1F5F9',
  },
  togglePassword:  { paddingHorizontal: 14 },
  toggleText:      { fontSize: 16 },
  errorText:       { color: '#EF4444', fontSize: 12, marginTop: 4, marginLeft: 4 },
  boton: {
    backgroundColor: '#6366F1', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 8,
  },
  botonDeshabilitado: { opacity: 0.7 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  linea:   { flex: 1, height: 1, backgroundColor: '#334155' },
  dividerTexto:   { color: '#475569', marginHorizontal: 12, fontSize: 13 },
  linkContainer:  { alignItems: 'center' },
  linkTexto:      { color: '#64748B', fontSize: 14 },
  linkAccion:     { color: '#6366F1', fontWeight: '600' },
  footer: {
    textAlign: 'center', color: '#475569',
    fontSize: 11, marginTop: 24, lineHeight: 16,
  },
});
