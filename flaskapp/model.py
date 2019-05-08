from flaskapp import db


class Entry(db.Model):
    id      = db.Column(db.Integer, primary_key=True)
    txt     = db.Column(db.Text,    nullable=False)
    value1  = db.Column(db.Float,   nullable=False)
    value2 = db.Column(db.Float, nullable=False)
    value3 = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"Entry('{self.txt}')"
