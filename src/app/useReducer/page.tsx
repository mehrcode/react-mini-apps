'use client'
import React, { useReducer } from 'react'

type State = {
    count: number;
};

type Action = 
| {type: 'increament'}
| {type: 'decreament'}
| {type: 'reset'};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'increament':
            return { count: state.count = 1 };
        case 'decreament':
            return { count: state.count - 1 };
        case 'reset':
            return {count: 0 };
        default:
            return state;
    }
};

export default function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });


    return (
        <div>
            <h2>Counter: {state.count}</h2>
            <button onClick={() => dispatch({ type: 'increament' })} className='bg-green-500 mx-2'>Increament</button>
            <button onClick={() => dispatch({ type: 'decreament' })} className='bg-red-500 mx-2'>Decreament</button>
            <button onClick={() => dispatch({ type: 'reset' })} className='bg-orange-500 mx-2'>Reset</button>
        </div>
    );
}

