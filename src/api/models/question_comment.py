from api.models.db import db
from datetime import datetime


class Question_comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_question = db.Column(db.Integer, db.ForeignKey("question.id"))
    question = db.relationship("Question", back_populates="question_comment")
    lawyer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    lawyer = db.relationship('User', foreign_keys=[lawyer_id], back_populates='written_answers')
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, id_question, id_user, text):
        self.id_question = id_question
        self.id_user = id_user
        self.text = text
        self.data_create = datetime.utcnow()

    def serialize(self):
        return {
            "id" : self.id,
            "id_question" : self.id_question,
            "lawyer_id": self.lawyer_id,
            "text" : self.text,
            "data_create": self.data_create
            } 