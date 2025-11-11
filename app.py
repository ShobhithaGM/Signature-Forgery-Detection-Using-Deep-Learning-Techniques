import os
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from model.predict import classify_signature

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploaded'

@app.route('/', methods=['GET', 'POST'])
def index1():
    result = None
    image_path = None
    if request.method == 'POST':
        file = request.files['signature']
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)

        result = classify_signature(image_path)

    return render_template("index.html", result=result, image_path=image_path)

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    image_path = None
    if request.method == 'POST':
        file = request.files['signature']
        if file:
            filename = secure_filename(file.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(image_path)

            # Run model prediction
            result = classify_signature(image_path)

    return render_template("index.html", result=result, image_path=image_path)

if __name__ == "__main__":
    app.run(debug=True)
