from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

computer_wins = 0
player_wins = 0
friend_wins = 0
f_choice = "rock"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['POST'])
def play():
    opponent = request.json['opponent']
    options = ['rock', 'paper', 'scissors']
    p_choice = request.json['choice']
    c_choice = random.choice(options)

    global computer_wins
    global player_wins
    global friend_wins
    global f_choice
    
    if opponent == 'Computer':
        # Logic for playing against the computer
        # ... (existing logic)

        return jsonify({
            'c_choice': c_choice,
            'result': result,
            'computer_wins': computer_wins,
            'player_wins': player_wins
        })
    elif opponent == 'Friend':
        # Logic for playing against a friend
        # ... (implement logic for two players)
        
        # Compare the choices of the two players
        if p_choice == f_choice:
            result = 'draw'
        elif (
            (p_choice == 'rock' and f_choice == 'scissors') or
            (p_choice == 'paper' and f_choice == 'rock') or
            (p_choice == 'scissors' and f_choice == 'paper')
        ):
            result = 'win'
            player_wins += 1  # Increment player wins
        else:
            result = 'lose'
            friend_wins += 1  # Increment Friend wins
            
        return jsonify({
            'friend_choice': f_choice,
            'result': result,
            'friend_wins': friend_wins,
            'player_wins': player_wins
        })

if __name__ == '__main__':
    app.run(debug=True)
