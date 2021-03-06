from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired


class EntryForm(FlaskForm):
    user_input = TextAreaField('Enter your text', validators=[DataRequired()])
    submit = SubmitField('Save to database')

class GetFont(FlaskForm):
    submit = SubmitField('Download font')
