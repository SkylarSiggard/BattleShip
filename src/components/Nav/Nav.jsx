import React, {Component} from 'react'
import './nav.scss'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";
import axios from 'axios'
import swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            userPic: ''
        }
    }
    componentDidMount() {
        axios.get('/auth/user').then(res => {
            if (res.data.user) {
                let user = {user: {user_id: res.data.user.user_id, username: res.data.user.username},
            loggedIn: res.data.loggedIn}
            this.props.updateUser(user)
            axios.get(`/api/users?username=${res.data.user.username}`).then(results => {
                // console.log('hello', results.data[0])
                this.setState({
                    username: results.data[0].username,
                    userPic: results.data[0].img
                })
            })
            }
        })
    }
    logout = async () => {
        const res = await axios.delete('/auth/logout')
        let user = {user: null, loggedIn: false}
        this.props.updateUser(user)
        // alert(res.data.message)
        swal.fire({
            text: res.data.message.text,
            type: 'success',
            timer: 1500,
            showConfirmButton: false
        })
        this.props.history.push('/')
        // console.log(this.props.history);
        
    }
    

    render() {
        return(
        <div className='Nav'>
            <Link to='/home'><button className='home-button'><i class="fas fa-anchor"></i>Control Room</button></Link>
            <div className='profile'>
                    <img src={this.state.userPic} alt="A boat to show ranking"/>
                    <div className='user'>{`${this.state.username}`}</div>
                <button onClick={() => this.logout()} className='logout-button'><i class="fas fa-sign-out-alt"></i>Logout</button>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    const {user, loggedIn} = state;
    return {user, loggedIn}
}

export default connect(
  mapStateToProps,
  { updateUser },
)(withRouter(Nav));
