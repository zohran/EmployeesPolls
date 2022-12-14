import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {handleSaveAnswer} from '../actions/common'

function Poll({dispatch, questions, users, auth}) {
    const { question_id } = useParams() 
    const navigate = useNavigate()


    useEffect(() => {
        !auth.id && navigate('/login')
    },[auth, navigate])

    function handleVote(answer) {
        const info = {
            authedUser: auth.id,
            qid: question_id, 
            answer
        }
        dispatch(handleSaveAnswer(info));
    }

    if(!questions[question_id]) return (<h1 data-testid='404'>404 Page Not Found</h1>)
    else return (users && <>
    <div>
        <h2>This poll was Orignated by: <b style={{color: "red"}}>{questions[question_id].author}</b> </h2>

        <h2>Result</h2>
        <div className='option-container'>
            <div>
            <div className='option'>
                <div style={{padding:'10px'}}>{questions[question_id].optionOne['text']}</div>
                {Object.keys(auth['answers']).includes(question_id) ? (
                    auth['answers'][question_id] === 'optionOne' ? (<button disabled>Voted</button>) :(<button disabled>click</button>)
                ) 
                
                : (<button onClick={() => handleVote('optionOne')}>click</button>)}
            </div>
            <p>Total votes: {questions[question_id].optionOne['votes'].length} ({100*questions[question_id].optionOne['votes'].length/(questions[question_id].optionOne['votes'].length+questions[question_id].optionTwo['votes'].length)}%)</p>
            </div>
            
            <div>
            <div className='option'>
                <div style={{padding:'10px'}}>{questions[question_id].optionTwo['text']}</div>
                {Object.keys(auth['answers']).includes(question_id) ? (
                    auth['answers'][question_id] === 'optionTwo' ? (<button disabled>Voted</button>) :(<button disabled>click</button>)
                ) 
                
                : (<button onClick={() => handleVote('optionTwo')}>click</button>)}
            </div>
            <p>Total votes: {questions[question_id].optionTwo['votes'].length} ({100*questions[question_id].optionTwo['votes'].length/(questions[question_id].optionOne['votes'].length+questions[question_id].optionTwo['votes'].length)}%)</p>
            </div>
        </div>
    </div>
    </>)
}

const mapStateToProps = ({users, userAuth, questions}) => ({
    auth: userAuth ? users[userAuth] : {id: null}, 
    questions,
    users
})


export default connect(mapStateToProps)(Poll)