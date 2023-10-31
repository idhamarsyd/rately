# src/models/rating.py
from app import db

class Movies(db.Model):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    year = db.Column(db.Integer)
    genre = db.Column(db.String(100))
    description = db.Column(db.Text)
    cover = db.Column(db.String(255))
    trailer = db.Column(db.String(255))

     def create(self):
      db.session.add(self)
      db.session.commit()
      return self

    def __init__(self,title,year,genre,description,cover,trailer):
        self.title = title
        self.year = year
        self.genre = genre
        self.description = description
        self.cover = cover
        self.trailer = trailer

    def __repr__(self):
        return '' % self.id

db.create_all()