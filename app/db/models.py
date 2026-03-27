import enum
from datetime import datetime
from typing import List, Optional
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, Enum as SQLEnum
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class StatusEnum(str, enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class User(Base):
    __tablename__ = "users"

    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    tasks: Mapped[List["Task"]] = relationship(back_populates="user", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    goal: Mapped[str] = mapped_column(Text)
    status: Mapped[StatusEnum] = mapped_column(SQLEnum(StatusEnum), default=StatusEnum.PENDING)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="tasks")
    steps: Mapped[List["Step"]] = relationship(back_populates="task", cascade="all, delete-orphan")
    outputs: Mapped[List["Output"]] = relationship(back_populates="task", cascade="all, delete-orphan")
    logs: Mapped[List["Log"]] = relationship(back_populates="task", cascade="all, delete-orphan")
    costs: Mapped[List["Cost"]] = relationship(back_populates="task", cascade="all, delete-orphan")

class Step(Base):
    __tablename__ = "steps"

    id: Mapped[int] = mapped_column(primary_key=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    step_number: Mapped[int] = mapped_column(Integer)
    agent_type: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(Text)
    status: Mapped[StatusEnum] = mapped_column(SQLEnum(StatusEnum), default=StatusEnum.PENDING)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    task: Mapped["Task"] = relationship(back_populates="steps")
    logs: Mapped[List["Log"]] = relationship(back_populates="step")

class Output(Base):
    __tablename__ = "outputs"

    id: Mapped[int] = mapped_column(primary_key=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    content: Mapped[str] = mapped_column(Text)
    version: Mapped[int] = mapped_column(Integer, default=1)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    task: Mapped["Task"] = relationship(back_populates="outputs")

class Log(Base):
    __tablename__ = "logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    step_id: Mapped[Optional[int]] = mapped_column(ForeignKey("steps.id"))
    tool_used: Mapped[Optional[str]] = mapped_column(String(100))
    input_data: Mapped[Optional[str]] = mapped_column(Text)
    output_data: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(50))
    error_message: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    task: Mapped["Task"] = relationship(back_populates="logs")
    step: Mapped[Optional["Step"]] = relationship(back_populates="logs")

class Cost(Base):
    __tablename__ = "costs"

    id: Mapped[int] = mapped_column(primary_key=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    model_used: Mapped[str] = mapped_column(String(100))
    tokens_used: Mapped[int] = mapped_column(Integer)
    cost_amount: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    task: Mapped["Task"] = relationship(back_populates="costs")
