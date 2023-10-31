from flask import Flask, request, jsonify, make_response, request, redirect, flash
from db import cursor, db
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
# from src.logger import logging

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


@app.route("/")
def hello_api():
    return {
        "app_name": "recSys App",
        "version": "v1.0.0",
        "message": "Welcome to our recommendation engine!"
    }

@app.route("/movies", methods=["GET"])
def get_movies():
    cursor.execute("SELECT * FROM movies")
    data = cursor.fetchall()
    return jsonify(data)



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