# schemas/usuario.py
from pydantic import BaseModel, EmailStr
from datetime import datetime

# Lo que recibimos del formulario registro.tsx
class UsuarioCreate(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr
    telefono: str
    password: str
    confirmarPassword: str

# Lo que le respondemos a la App (UsuarioResponse)
class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: str
    telefono: str
    created_at: datetime

    class Config:
        from_attributes = True