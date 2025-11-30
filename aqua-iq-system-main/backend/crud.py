from sqlalchemy.orm import Session
from .models import RainData, User

def create_user(db: Session, username: str, password: str):
    user = User(username=username, password=password)
    db.add(user)
    db.commit()
    return user

def authenticate_user(db: Session, username: str, password: str):
    return db.query(User).filter(User.username == username, User.password == password).first()

def insert_rain(db: Session, value: float):
    rain = RainData(value=value)
    db.add(rain)
    db.commit()
    return rain

def get_rain_history(db: Session):
    return db.query(RainData).order_by(RainData.date.desc()).all()
