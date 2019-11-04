import React, {Component} from 'react'
import './enemyGrid.scss'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class EnemyGrid extends Component {
    constructor() {
        super()
        this.state = {
            // 0 = empty
            // 1 = submarine(3)
            // 2 = destroyer(2)
            // 3 = cruiser(3)
            // 4 = battleship(4)
            // 5 = carrier(5)
            // 6 = miss
            // 7 = hit
            
            enemyGrid : [],
            ship_sunk: false,
            isTurn: false
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    componentDidUpdate(prevProps) {
        if (this.props.grid !== prevProps.grid) {
            this.setState({enemyGrid: this.props.grid})
        }
        if (this.props.gameStats !== prevProps.gameStats) {
            if (this.props.gameStats.turn === this.props.user.user.user_id) {
                this.setState({isTurn: true})
            }
        }
    }

    // This is the function that will be called after the move is made.
    // If there was a hit pass in the string 'hit' as well as 'miss' if the turn result is a miss

    updateGame = (turn_result) => {
        for(let i = 0; i < this.state.enemyGrid.length; i++) {
            console.log('test')
            if (this.state.enemyGrid[i].includes(1) === true || this.state.enemyGrid[i].includes(2) === true || this.state.enemyGrid[i].includes(3) === true || this.state.enemyGrid[i].includes(4) === true || this.state.enemyGrid[i].includes(5) === true) {
                console.log('success')
                axios.put(`/api/game/${+this.props.match.params.gameroom_id}/${this.props.user.user.user_id}?turn_result=${turn_result}&ship_sunk=${this.state.ship_sunk}`, {grid: this.state.enemyGrid}).then(res => {
                    this.setState({isTurn: false})
                })
            break
            } else {
                axios.delete(`/api/games/end/${this.props.match.params.gameroom_id}/${this.props.user.user.user_id}`).then(res => {
                    alert('you won!')
                    this.props.history.push('/home')
                })
            }
        }

        
    }

    onYeet = (e, i1, i2) => {
        if (this.state.isTurn) {
            console.log(e);
            console.log(i1);
            console.log(i2);

            if (e === 1 || e === 2 || e === 3 || e === 4 || e === 5) {
            let newGrid1 = this.state.enemyGrid;
            newGrid1[i1][i2] = 7;
            this.setState({
                enemyGrid: newGrid1
            });
            this.updateGame('hit')
            } else {
            let newGrid = this.state.enemyGrid;
            newGrid[i1][i2] = 6;
            this.setState({
                enemyGrid: newGrid
            });
            this.updateGame('miss')
            console.log(this.state);
        }
        }
    
};
render() {
    const mappedGrid = this.state.enemyGrid.map((element, i1) => {
    return element.map((element2, i2) => {
        switch (element2) {
        case 0:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="empty"
                className="yeet"
            ></div>
            );

        case 1:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="sub"
                className="yeet"
            ></div>
            );

        case 2:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="destroyer"
                className="yeet"
            ></div>
            );

        case 3:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="cruiser"
                className="yeet"
            ></div>
            );

        case 4:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="battleship"
                className="yeet"
            ></div>
            );

        case 5:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="carrier"
                className="yeet"
            ></div>
            );

        case 6:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="miss"
                className="yeet"
            ></div>
            );

        case 7:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="hit"
                classname="yeet"
            ></div>
            );

        default:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                className="yeet"
            ></div>
            );
        }
    });
    });

    return (
    <div>
        <div onClick={this.nice} className="container">
        {mappedGrid}
          {/* {mappedyeezy} */}

        </div>
        <div></div>
    </div>
    );
}
}

function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(EnemyGrid));
