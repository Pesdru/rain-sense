from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from .database import Base

class RainData(Base):
    __tablename__ = "rain_data"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    value = Column(Float, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
