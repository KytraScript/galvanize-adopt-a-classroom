import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Inputs = () => {

    const [nameInput, getNameInput] = useState('');
    const [pledgeInput, getPledgeInput] = useState(0);
    const [paidInput, getPaidInput] = useState(0);

    const submitPledge = () => {
        axios.post('http://localhost:5500/addPledge', {
            name: nameInput,
            pledge: pledgeInput,
            paid: paidInput
        })
            .then( (response) => {
                console.log(response);
                window.location.href = window.location.href;
            })
            .catch( err => console.log(err));
    };

    return (
        <div className={'inputs-container'}>
            <div className={'input'}>
                <label htmlFor={'new-name'}>Name:</label>
                <input type={'text'} maxLength={'45'} name={'new-name'} placeholder={'...enter name'}
                onChange={ (event) => getNameInput(event.target.value)}/>
            </div>
            <div className={'input'}>
                <label htmlFor={'new-pledged'}>Target Pledge:</label>
                <input type={'number'} min={0} name={'new-pledged'} placeholder={'...pledged'}
                       onChange={ (event) => getPledgeInput(event.target.value)}/>
            </div>
            <div className={'input'}>
                <label htmlFor={'new-paid'}>Current Contribution:</label>
                <input type={'number'} min={0} name={'new-paid'} placeholder={'...contributed'}
                       onChange={ (event) => getPaidInput(event.target.value)}/>
            </div>
            <div className={'input'}>
                <button id={'primary'} onClick={ () => {submitPledge()}}>MAKE A PLEDGE!</button>
            </div>
        </div>
    );
};

export default Inputs;
