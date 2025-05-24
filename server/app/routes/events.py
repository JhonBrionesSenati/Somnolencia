from fastapi import APIRouter
from app.models.evento_model import get_eventos

router = APIRouter()

@router.get("/eventos/")
def obtener_eventos():
    eventos = get_eventos()
    return {"eventos": eventos}
