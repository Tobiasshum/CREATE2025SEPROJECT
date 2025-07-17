def print_board(board):
    """Prints the current state of the board."""
    for row in board:
        print(" | ".join(row))
        print("-" * 9)

def check_winner(board, player):
    """Checks if the given player has won."""
    for row in board:
        if all(cell == player for cell in row):
            return True
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True
    if all(board[i][i] == player for i in range(3)) or all(board[i][2 - i] == player for i in range(3)):
        return True
    return False

def is_draw(board):
    """Checks if the game is a draw."""
    return all(cell != " " for row in board for cell in row)

def tic_tac_toe():
    """Main function to play Tic Tac Toe."""
    match_board = {"X": 0, "O": 0, "Draws": 0}  # Track wins and draws
    players = ["X", "O"]

    while True:
        # Initialize the board for a new game
        board = [[" " for _ in range(3)] for _ in range(3)]
        current_player = 0

        print("Welcome to Tic Tac Toe!")
        print_board(board)

        while True:
            print(f"Player {players[current_player]}'s turn.")
            try:
                row = int(input("Enter row (0, 1, 2): "))
                col = int(input("Enter column (0, 1, 2): "))
                if board[row][col] != " ":
                    print("Cell already taken. Try again.")
                    continue
            except (ValueError, IndexError):
                print("Invalid input. Try again.")
                continue

            board[row][col] = players[current_player]
            print_board(board)

            if check_winner(board, players[current_player]):
                print(f"Player {players[current_player]} wins!")
                match_board[players[current_player]] += 1
                break
            if is_draw(board):
                print("It's a draw!")
                match_board["Draws"] += 1
                break

            current_player = 1 - current_player  # Switch player

        # Display the match board
        print("\nMatch Board:")
        print(f"Player X Wins: {match_board['X']}")
        print(f"Player O Wins: {match_board['O']}")
        print(f"Draws: {match_board['Draws']}")

        rematch = input("Do you want a rematch? (yes/no): ").strip().lower()
        if rematch != "yes":
            print("Thanks for playing Tic Tac Toe!")
            break

if __name__ == "__main__":
    tic_tac_toe()