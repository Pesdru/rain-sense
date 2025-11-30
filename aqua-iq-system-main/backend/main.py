from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .auth import login, get_db
from .crud import insert_rain, get_rain_history, create_user

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/auth/register")
def register(username: str, password: str, db: Session = Depends(get_db)):
    return create_user(db, username, password)

@app.get("/auth/login")
def do_login(response=Depends(login)):
    return response

@app.post("/rain/add")
def add_rain(value: float, db: Session = Depends(get_db)):
    return insert_rain(db, value)

@app.get("/rain/history")
def history(db: Session = Depends(get_db)):
    return get_rain_history(db)

@app.get("/health")
def health():
    return {"status": "ok"}
