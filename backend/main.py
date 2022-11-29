from flask import Flask, render_template, template_rendered

app = Flask(__name__, template_folder='backend')


@app.route('/')
def hello():
    return render_template('index.html')

    
app.run(debug=True)






