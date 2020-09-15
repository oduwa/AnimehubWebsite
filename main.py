from flask import Flask, flash, request, redirect, render_template, url_for
from werkzeug.utils import secure_filename
import json, os
application = Flask(__name__)


@application.route('/', methods=['GET', 'POST'])
def home():
    return render_template("landing.html")


if __name__ == "__main__":
    application.debug = True
    application.run(use_reloader=False)
