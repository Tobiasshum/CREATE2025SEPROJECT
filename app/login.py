from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


Name1 = "user1"
Name2 = "user2"

@app.route('/')
def landing_page():
    return render_template('login.html')  # 

@app.route('/submit-names', methods=['POST'])
def submit_names():
    name1 = request.form.get('name1')  
    name2 = request.form.get('name2')  

    return redirect(url_for('tictactoe'))  # Redirect to the Tic Tac Toe page

@app.route('/tictactoe')
def tictactoe():
    return render_template('tictactoe.html')  

if __name__ == '__main__':
    app.run(debug=True)