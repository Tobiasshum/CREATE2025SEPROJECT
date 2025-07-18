
from flask import Flask, render_template, request, redirect, url_for # imports

app = Flask(__name__) # create Flask app
game_board = [[0 for _ in range(7)] for _ in range(6)]
current_player=[1]

  
def check_winner(board, player):
    ROWS=6 
    COLS=7
    for row in range(ROWS):
        for col in range(COLS-3):
            if all(board[row][col+i]==player for i in range(4)):
                return True
            
    for row in range(ROWS -3):
        for col in range(COLS):
            if all(board[row +i][col]==player for i in range(4)):
                return True
    for row in range(ROWS-3):
        for col in range(COLS-3):
            if all (board[row +i][col +i]== player for i in range(4)):
                return True
        
    for row in range (ROWS-3):
        for col in range(3,COLS):
            if all (board[row+i][col-i]==player for i in range (4)):
                return True
    return False


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method =="POST":
        col = int(request.form["column"])
        for row in reversed(range(6)):
            if game_board[row][col]==0: #go throught the rows in that column chosen row-by-row until it finds the cordinate where both col and row are empty
                game_board[row][col]=current_player[0] #place the current player in it
              
                if check_winner(game_board, current_player[0]):
                    return f"player {current_player[0]} wins!"
                
                if current_player[0]==1: #if the current player is 1 it switch to 2
                    current_player[0]=2
                else:
                    current_player[0]=1#vise versa
                break

        return redirect(url_for('home'))

    return render_template ("connect_four.html", game_board=game_board)



if __name__ == "__main__":
    app.run(debug=True)