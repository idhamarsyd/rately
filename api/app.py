from flask import Flask, request, jsonify, make_response, request, redirect, flash
from db import cursor, db
import json
from datetime import datetime, timedelta, timezone
import sys
import time
import logging
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import os
from sqlalchemy.engine import URL
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)

url_object = URL.create(
    "mysql+pymysql",
    username="root",
    password="",  # plain (unescaped) text
    host="localhost",
    database="youtube-movie",
)

engine = create_engine(url_object)
dbb = engine.connect()

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_DATABASE'] = 'youtube-movie'
jwt = JWTManager(app)

# QUERIES

GET_MOVIES = "SELECT * FROM movies"

class Movies(dbb.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text)
    cover = db.Column(db.String(), nullable=False)
    trailer = db.Column(db.String(), nullable=False)

    # def __repr__(self):
    #     return f'<Student {self.firstname}>'


@app.route("/")
def hello_api():
    movies = Movies.query.all()
    return movies

@app.route("/movies", methods=["GET"])
def get_movies():
    cursor.execute("SELECT * FROM movies")
    data = cursor.fetchall()
    # db.close()
    cursor.close()
    return jsonify(data)


@app.route("/movie/<int:id>", methods=["GET"])
def get_movie_by_id(id):
    cursor.execute("SELECT * FROM movies WHERE id = ('{}')".format(id))
    data = cursor.fetchall()
    return jsonify(data)

@app.route("/search/<string:param>", methods=["GET"])
def search_movie(param):
    cursor.execute("SELECT * FROM movies WHERE title like ('%{}%')".format(param))
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/add_movie', methods=["POST"])
def add_movie():
    title = request.json.get("title", None)
    year = request.json.get("year", None)
    cover = request.json.get("cover", None)
    trailer = request.json.get("trailer", None)
    description = request.json.get("description", None)
    genre = request.json.get("genre", None)
    # Check for duplicate title
    sql_check = """SELECT * FROM movies WHERE title=%s"""
    values_check = (title,)
    cursor.execute(sql_check, values_check)
    result = cursor.fetchone()
    if result:
        return {'msg': 'Film telah ditambahkan sebelumnya'}, 400
    if not title or not year or not cover or not trailer or not description or not genre:
        return {'msg': 'Missing required fields'}, 400
    sql = """INSERT INTO movies (title, year, genre, description, cover, trailer) VALUES (%s, %s, %s, %s, %s, %s)"""
    values = (title, year, genre, description, cover, trailer)
    try:
        cursor.execute(sql, values)
        db.commit()
        return {'msg': 'Movie added successfully'}, 201
    except Exception as e:
        return {'msg': str(e)}, 500

@app.route('/delete_movie/<int:id>', methods=['DELETE'])
def delete_movie(id):
    sql_delete = """DELETE FROM movies WHERE id=%s"""
    values_delete = (id,)
    try:
        cursor.execute(sql_delete, values_delete)
        db.commit()
        return {'msg': 'Data film berhasil dihapus'}, 200
    except Exception as e:
        return {'msg': str(e)}, 500

@app.route('/update_movie/<id>', methods=["PUT"])
def update_movie(id):
    movie_id = int(id)
    title = request.json.get("title", None)
    year = request.json.get("year", None)
    cover = request.json.get("cover", None)
    trailer = request.json.get("trailer", None)
    description = request.json.get("description", None)
    genre = request.json.get("genre", None)

    # Check if movie exists
    # sql_check = """SELECT * FROM movies WHERE id=%s"""
    # values_check = (movie_id,)
    # cursor.execute(sql_check, values_check)
    # result = cursor.fetchone()
    # if not result:
    #     return {'msg': 'Data film tidak ditemukan.'}, 404

    # Update movie information
    sql_update = """UPDATE movies SET title=%s, year=%s, genre=%s, description=%s, cover=%s, trailer=%s WHERE id=%s"""
    values_update = (title, year, genre, description, cover, trailer, movie_id)
    try:
        cursor.execute(sql_update, values_update)
        db.commit()
        return {'msg': 'Data film berhasil diupdate.'}, 200
    except Exception as e:
        return {'msg': str(e)}, 500

@app.route("/comments", methods=["GET"])
def get_comments():
    cursor.execute("SELECT * FROM comments")
    data = cursor.fetchall()
    return jsonify(data)

@app.route("/comments-formatted", methods=["GET"])
def get_comments_formatted():
    cursor.execute("SELECT c.id, c.comment, c.label, m.title FROM comments c JOIN movies m ON c.movie = m.id")
    data = cursor.fetchall()
    return jsonify(data)

@app.route("/comments-movies-list", methods=["GET"])
def get_comments_movies():
    cursor.execute("SELECT DISTINCT c.movie, m.title FROM comments c JOIN movies m ON c.movie = m.id")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/add_comment', methods=["POST"])
def add_comment():
    comment = request.json.get("comment", None)
    movie = request.json.get("movie", None)
    label = request.json.get("label", None)

    # Find the movie ID based on the title
    cursor.execute("SELECT id FROM movies WHERE title = %s", (movie,))
    movieId = cursor.fetchone()
    if not movieId:
        return {'msg': 'Data film tidak ditemukan.'}, 404
    
    if label not in ("POSITIVE", "NEGATIVE"):
        return {"msg": "Invalid label value. Label must be either 'POSITIVE' or 'NEGATIVE'."}, 400

    # Update movie information
    sql = """
    INSERT INTO comments (comment, movie, label)
    SELECT '%s', m.id, '%s'
    FROM movies m
    WHERE m.title = '%s'
    """ % (comment, label, movie)
    try:
        cursor.execute(sql)
        db.commit()
        return {'msg': 'Data komentar berhasil ditambahkan.'}, 200
    except Exception as e:
        return {'msg': str(e)}, 500

@app.route('/delete_comment/<int:id>', methods=['DELETE'])
def delete_comment(id):
    sql_delete = """DELETE FROM comments WHERE id=%s"""
    values_delete = (id,)
    try:
        cursor.execute(sql_delete, values_delete)
        db.commit()
        return {'msg': 'Data komentar berhasil dihapus'}, 200
    except Exception as e:
        return {'msg': str(e)}, 500

@app.route('/update_comment/<id>', methods=["PUT"])
def update_comment(id):
    comment_id = int(id)
    comment = request.json.get("comment", None)
    movie = request.json.get("movie", None)
    label = request.json.get("label", None)

    # Check if movie exist
    cursor.execute("SELECT id FROM movies WHERE title = %s", (movie,))
    movieId = cursor.fetchone()
    if not movieId:
        return {'msg': 'Data film tidak ditemukan.'}, 404

    # Check if comment exists
    sql_check = """SELECT * FROM comments WHERE id=%s"""
    values_check = (comment_id,)
    cursor.execute(sql_check, values_check)
    result = cursor.fetchone()
    if not result:
        return {'msg': 'Komentar tidak ditemukan.'}, 404

    # Update comment information
    sql_update = """UPDATE comments SET comment=%s, movie=%s, label=%s WHERE id=%s"""
    values_update = (comment, movieId['id'], label, comment_id)
    try:
        cursor.execute(sql_update, values_update)
        db.commit()
        return {'msg': 'Komentar berhasil diupdate.'}, 200
    except Exception as e:
        return {'msg': str(e)}, 500




@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
        
@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "admin" or password != "admin1":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

from routes import first
app.register_blueprint(first)


# from routes import product_bp, rating_bp, cf_recommend_bp, cf_updating_component_bp
# app.register_blueprint(cf_updating_component_bp)
# app.register_blueprint(cf_recommend_bp)
# app.register_blueprint(product_bp)
# app.register_blueprint(rating_bp)


if __name__=="__main__":
    app.run(host="0.0.0.0")
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    event_handler = LoggingEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()