import React from 'react'
import Todos from '../components/Todos/Todos'
import InvitePeople from '../components/InvitePeople/InvitePeople'

const Home = () => {
    return (
        <>
            <div className="home">
                <div className="container-fluid">
                    <InvitePeople />
                    <Todos />
                </div>
            </div>
        </>
    )
}

export default Home
