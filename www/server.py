from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import sql, select, func
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class SentencePair(db.Model):
	id = db.Column(db.String(100),primary_key=True)
	eng_sent_id = db.Column(db.Integer,nullable=False)
	eng_sent = db.Column(db.String(500),nullable=False)
	jpn_sent_id = db.Column(db.Integer,nullable=False)
	jpn_sent = db.Column(db.String(500),nullable=False)
	eng_compx = db.Column(db.Float,nullable=False)

	def __repr__(self):
		return f"SentencePair('{self.eng_sent_id}','{self.jpn_sent_id}')"

@app.route("/")
def front_page():
	return render_template('index.html')

@app.route("/get-sentence-pair")
def get_sentence_pair():
	comp = request.args.get('comp')
	comp = int(comp)
	s = select([SentencePair]).order_by(func.random()).where(SentencePair.eng_compx>comp).limit(1)
	result = db.engine.execute(s)
	for row in result:
		eng_sent = row.eng_sent
		jpn_sent = row.jpn_sent
		return json.dumps({'e':eng_sent,'j':jpn_sent})

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)
