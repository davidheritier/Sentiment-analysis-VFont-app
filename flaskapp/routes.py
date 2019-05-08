from flask import render_template, url_for, redirect, request, jsonify
from flaskapp import app
from flaskapp import db
from flaskapp.form import EntryForm, GetFont
from flaskapp.model import Entry
from tb_function import tb_function
# from flaskapp.process import process, getUserInput, getEmotionalCursors, setVariations


# Index page
@app.route("/", methods=['GET', 'POST'])
def index():
    form = EntryForm()
    if form.validate_on_submit():
        entry = Entry(txt=form.user_input.data)
        value01 = request.get_json(polarity)
        # value02 = request.json(subjectivity)
        # value03 = value01 * value02
        # print (value01, value02)
        db.session.add(entry)
        # db.session.add(value01)
        # db.session.add(value02)
        # db.session.add(value03)
        db.session.commit()
        return redirect(url_for('getfont'))

    return render_template('index.html', form=form)


# Get font page
@app.route("/getfont", methods=['GET', 'POST'])
def getfont():
    entries = Entry.query.all()
    entry = entries[-1]

    form = GetFont()
    if form.validate_on_submit():
        return redirect(url_for(''))

    return render_template('getfont.html', title='Get your font', entry=entry, form=form)


# Collection page
@app.route("/collection")
def collection():
    entry = reversed(Entry.query.all())

    return render_template('collection.html', title='Collection', entry=entry)


# Sentiment analysis page
@app.route('/textsentiment', methods=['POST'])
def add_numbers():
    content = request.json
    value = content["value"]

    # txt.sentiment.polarity, txt.sentiment.subjectivity, txt.sentiment.polarity * txt.sentiment.subjectivity

    text_sentiment = tb_function(value)

    return jsonify(
        polarity=text_sentiment.polarity,
        subjectivity=text_sentiment.subjectivity,
    )
