from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import usuario

# Creamos la aplicación
app = FastAPI(title="Bienvenidos a mi API")

# Configuración de CORS: Permite que React Native se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluimos las rutas que procesarán el registro
app.include_router(usuario.router, prefix="/usuarios", tags=["Usuarios"])

@app.get("/")
def inicio():
    return {"mensaje": "Servidor del Hospital funcionando correctamente"}