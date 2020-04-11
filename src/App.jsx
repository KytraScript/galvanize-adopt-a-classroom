import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Gauge from './Gauge.jsx';
import Inputs from './Inputs.jsx';
import axios from 'axios';

const App = () => {

    const [contributors, setContributors] = useState([]);
    const [totalPledged, updateTotalPledged] = useState('');
    const [totalPaid, updateTotalPaid] = useState('');
    const [editing, toggleEditing] = useState(false);
    const [paidUpdate, setPaidUpdate] = useState('');
    const [lineItemUpdate, setLineItem] = useState({});
    const [removing, toggleRemoving] = useState(false);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const getData = () => {
        axios.get('http://localhost:5500/allEntries')
            .then(response => {
                setContributors(response.data);
            })
            .catch(err => console.log(err));
    };

    const editEntry = (id, amount) => {
        axios.put('http://localhost:5500/updatePledge', {id: id, paid: amount})
            .then(response => {
                console.log(response);
                window.location.href = window.location.href;
            })
            .catch(err => console.log(err));
    };

    const removeEntry = (id) => {
        axios.delete('http://localhost:5500/removePledge', {data: {id: id} })
            .then(response => {
                console.log(response);
                window.location.href = window.location.href;
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        let pledgeSum = 0;
        let paidSum = 0;
        contributors.forEach(entry => {
            pledgeSum += Number(entry.committed);
            paidSum += Number(entry.paid);
        });
        updateTotalPledged(pledgeSum);
        updateTotalPaid(paidSum);
    }, [contributors]);

    return (
        <div className={'main'}>
            <div className={'nav-bar-wrapper'}>
                <div className={'nav-bar-logo'}><img id={'logo'} src={'./img/galvanize-logo.svg'}/></div>
                <div className={'nav-link'}>
                    <h2>Make Your Donation!</h2>
                    <h2>We Are Supporting:</h2>
                    <img src={'./img/AAC-logo.webp'}/>
                    <p><a href={'https://give.adoptaclassroom.org/campaign/adoptaclassroom-org-disaster-relief-fund/c71352'}>
                        https://give.adoptaclassroom.org/campaign/adoptaclassroom-org-disaster-relief-fund/c71352
                    </a></p>
                </div>
            </div>
            <div className={'gauge-graph'}>
                <Gauge value={totalPaid} min={0} max={totalPledged} label={'Paid / Pledged'} units={'$'}/>
                <div className={'svg-label-collected'}>{formatter.format(totalPaid)} Collected</div>
                <div className={'svg-label-pledged'}>{formatter.format(totalPledged)} Pledged</div>
            </div>

            <Inputs/>

            {editing ? <div className={'edit-mod'}>
                <div className={'edit-inputs'}>
                    <div className={'inputs-container'}>
                        <div className={'input'}>
                            <label htmlFor={'new-name'}>Name:</label>
                            <span>{lineItemUpdate.name}</span>
                        </div>
                        <div className={'input'}>
                            <label htmlFor={'new-pledged'}>Current Pledge:</label>
                            <span>{'' + formatter.format(lineItemUpdate.committed)}</span>
                        </div>
                        <div className={'input'}>
                            <label htmlFor={'new-paid'}>Current Contribution:</label>
                            <input type={'number'} min={0} name={'new-paid'} placeholder={'' + formatter.format(paidUpdate)}
                                   onChange={(event) => { setPaidUpdate(event.target.value);}}/>
                        </div>
                        <div className={'input'}>
                            <button id={'secondary'} onClick={() => {
                                toggleEditing(false);
                            }}>Go Back
                            </button>
                            <button id={'primary'} onClick={() => {
                                editEntry(lineItemUpdate.idEntry, paidUpdate);
                            }}>Update Pledge
                            </button>
                        </div>
                    </div>
                </div>
            </div> : ''
            }

            {removing ? <div className={'edit-mod'}>
                <div className={'edit-inputs'}>
                    <div className={'inputs-container'}>
                        <div className={'input center'}>Are You Sure You Want To Remove This Pledge?</div>
                        <div className={'input'}>
                            <label htmlFor={'new-name'}>Name:</label>
                            <span>{lineItemUpdate.name}</span>
                        </div>
                        <div className={'input'}>
                            <label htmlFor={'new-pledged'}>Current Pledge:</label>
                            <span>{'' + formatter.format(lineItemUpdate.committed)}</span>
                        </div>
                        <div className={'input'}>
                            <label htmlFor={'new-paid'}>Current Contribution:</label>
                            <span>{'' + formatter.format(lineItemUpdate.paid)}</span>
                        </div>
                        <div className={'input'}>
                            <button id={'secondary'} onClick={() => {
                                toggleRemoving(false);
                            }}>Go Back
                            </button>
                            <button id={'primary'} onClick={() => {
                                removeEntry(lineItemUpdate.idEntry)
                            }}>Yes, Remove Pledge!
                            </button>
                        </div>
                    </div>
                </div>
            </div> : ''
            }

            <div className={'contributors-view'}>
                <table>
                    <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Pledged:</th>
                        <th>Given:</th>
                        <th>Options:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contributors && contributors.map(item => {
                        return (<tr className={'contributor'} key={item.idEntry}>
                            <td>{item.name}</td>
                            <td>${item.committed}</td>
                            <td>${item.paid}</td>
                            <td>
                                <div className={'span-row'}>
                                    <div className={'option'} onClick={() => {
                                        if (!editing) {
                                            toggleEditing(true);
                                        }
                                        setPaidUpdate(item.paid);
                                        setLineItem(item);
                                    }}><img alt={'update entry'} id={'edit'} src={'./img/edit.svg'}/></div>
                                    <div className={'option'} onClick={() => {
                                        if (!removing) {
                                            toggleRemoving(true);
                                        }
                                        setLineItem(item);
                                    }}><img alt={'remove entry'} id={'erase'} src={'./img/eraser.svg'}/></div>
                                </div>
                            </td>
                        </tr>);
                    })}
                    </tbody>
                </table>
            </div>
            <div className={'footer'}>This page was created with love by <a href={'http://www.linkedin.com/in/kytrascript'}>Fort Hood SEIR Kytra Murphree</a>.</div>
        </div>
    );

};

ReactDOM.render(<App/>, document.getElementById('root'));
