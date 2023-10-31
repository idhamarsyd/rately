from flask import Blueprint
from src.components.first import First

first = Blueprint('first', __name__)

@first.route('/name')
def sayName():
    name = First(name="bobby")
    call_name = name.sayName()

    return call_name

    # name("Hello")