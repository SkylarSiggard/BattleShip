import React, {Component} from 'react'
import './gameroom.scss'
import Nav from '../Nav/Nav'
import EmyGrid from './EnemyGrid/enemyGrid'
import LeaderBoard from './LeaderBoard/LeaderBoard'
import Ships from './Ships/Ships'
import YourGrid from './YourGrid/YourGrid'

export default class Gameroom extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }
    render() {
        return(
        <div>
                <Nav/>
            <div className='Gameroom'>
                <EmyGrid/>
                <YourGrid/>
                <LeaderBoard/>
                <Ships/>
        </div>
    </div>
        )
    }
}
