// ─── Cambia esta URL por la IP de tu máquina ─────────────
// Ejemplo: 'http://192.168.1.10:8000'  (celular físico)
// Ejemplo: 'http://10.0.2.2:8000'      (emulador Android)
// Ejemplo: 'http://localhost:8000'      (simulador iOS)
const BASE_URL = 'http://192.168.18.7:8000';

// ─── Tipos ────────────────────────────────────────────────
export type UsuarioCreate = {
  nombre:            string;
  apellido:          string;
  email:             string;
  telefono:          string;
  password:          string;
  confirmarPassword: string;
};

export type UsuarioUpdate = {
  nombre?:   string;
  apellido?: string;
  email?:    string;
  telefono?: string;
};

export type UsuarioResponse = {
  id:         number;
  nombre:     string;
  apellido:   string;
  email:      string;
  telefono:   string;
  created_at: string;
  updated_at: string;
};

// ─── Helper fetch ─────────────────────────────────────────
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Error en el servidor');
  }

  return data as T;
}

// ─── CRUD ─────────────────────────────────────────────────

// CREATE
export const registrarUsuario = (usuario: UsuarioCreate) =>
  apiFetch<UsuarioResponse>('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  });

// READ — todos
export const obtenerUsuarios = () =>
  apiFetch<UsuarioResponse[]>('/usuarios');

// READ — uno
export const obtenerUsuario = (id: number) =>
  apiFetch<UsuarioResponse>(`/usuarios/${id}`);

// UPDATE
export const actualizarUsuario = (id: number, datos: UsuarioUpdate) =>
  apiFetch<UsuarioResponse>(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos),
  });

// DELETE
export const eliminarUsuario = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || 'Error al eliminar');
  }
};
