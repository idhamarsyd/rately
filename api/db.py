import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="youtube-movie"
)

cursor = db.cursor(dictionary=True)