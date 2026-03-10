from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# cargar variables de entorno
load_dotenv()

# obtener la URL de la base de datos desde la variable de entorno
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()
if not DATABASE_URL:
    raise ValueError(
        "No se ha definido la variable DATABASE_URL en .env o está vacía. "
        "Asegúrate de que el archivo .env existe y contiene: "
        "DATABASE_URL=postgresql://usuario:pass@host:puerto/db"
    )

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# dependencia para inyectar en rutas
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
