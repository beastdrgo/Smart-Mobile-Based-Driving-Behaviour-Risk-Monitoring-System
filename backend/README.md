# Fleet Guard Backend

Backend service for the **Smart Mobile-Based Driver Safety & Fleet Monitoring System**.

This backend handles:

- User authentication
- Trip start / end APIs
- Driver event logging
- Safety score calculation
- Productivity score calculation
- Admin dashboard data
- Notifications and alerts

---

## Tech Stack

- **FastAPI** – API framework
- **PostgreSQL** – main database
- **SQLAlchemy** – ORM
- **Pydantic** – request / response validation
- **Uvicorn** – ASGI server
- **Alembic** – database migrations
- **JWT Authentication** – secure login
- **Python 3.10+**

---

## Project Structure

```text
backend/
│── app/
│   │── main.py
│   │── core/
│   │   │── config.py
│   │   │── security.py
│   │── db/
│   │   │── base.py
│   │   │── session.py
│   │── models/
│   │── schemas/
│   │── routes/
│   │── services/
│   │── utils/
│── tests/
│── requirements.txt
│── README.md