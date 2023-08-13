from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

computer_wins = 0
player_wins = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['POST'])
def play():
    options = ['rock', 'paper', 'scissors']
    p_choice = request.json['choice']
    c_choice = random.choice(options)

    global computer_wins
    global player_wins

    if p_choice == c_choice:
        result = 'draw'
    elif (
        (p_choice == 'rock' and c_choice == 'scissors') or
        (p_choice == 'paper' and c_choice == 'rock') or
        (p_choice == 'scissors' and c_choice == 'paper')
    ):
        result = 'win'
        player_wins += 1  # Increment player wins
    else:
        result = 'lose'
        computer_wins += 1  # Increment computer wins

    return jsonify({
        'c_choice': c_choice,
        'result': result,
        'computer_wins': computer_wins,
        'player_wins': player_wins
    })

if __name__ == '__main__':
    app.run(debug=True)
