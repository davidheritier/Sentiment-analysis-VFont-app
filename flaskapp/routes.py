from flask import render_template, url_for, redirect
from flaskapp import app
from flaskapp import db
from flaskapp.form import EntryForm, GetFont
from flaskapp.model import Entry
# from flaskapp.process import process, getUserInput, getEmotionalCursors, setVariations


@app.route("/", methods=['GET', 'POST'])
def index():
    form = EntryForm()
    if form.validate_on_submit():
        entry = Entry(txt=form.user_input.data)
        db.session.add(entry)
        db.session.commit()
        return redirect(url_for('getfont'))

    return render_template('index.html', form=form)


@app.route("/getfont", methods=['GET', 'POST'])
def getfont():
    entries = Entry.query.all()
    entry = entries[-1]

    form = GetFont()
    if form.validate_on_submit():
        return redirect(url_for(''))

    return render_template('getfont.html', title='Get your font', entry=entry, form=form)


@app.route("/collection")
def collection():
    entry = reversed(Entry.query.all())

    return render_template('collection.html', title='Collection', entry=entry)
