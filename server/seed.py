from app import app
from models import User, db
from faker import Faker

fake = Faker()
with app.app_context():
    db.create_all()

    # Delete all rows in all tables
    User.query.delete()

    # Create user objects
    users = []
    for _ in range(25):
        user = User(name=fake.name(), email=fake.email())
        users.append(user)

    for u in users: 
        db.session.add(u)
        db.session.commit()    