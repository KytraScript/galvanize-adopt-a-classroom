import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Gauge from './Gauge.jsx';
import Inputs from './Inputs.jsx';
import axios from 'axios';

const App = () => {

    const [contributors, setContributors] = useState([]);
    const [totalPledged, updateTotalPledged] = useState('');
    const [totalPaid, updateTotalPaid] = useState('');

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const getData = () => {
        axios.get('http://localhost:5500/allEntries')
            .then(response => {
                setContributors(response.data);
            });
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
            <div className={'contributors-view'}>
                <table>
                    <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Pledged:</th>
                        <th>Given:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contributors.map(item => {
                        return (<tr className={'contributor'} key={item.idEntry}>
                            <td>{item.name}</td>
                            <td>${item.committed}</td>
                            <td>${item.paid}</td>
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
