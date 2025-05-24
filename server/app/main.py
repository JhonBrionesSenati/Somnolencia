from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.routes import events 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    #  allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.include_router(events.router, prefix="/api") 

