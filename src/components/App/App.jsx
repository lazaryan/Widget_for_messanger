import React, {Component, Fragment} from 'react';

import Chat2 from '_components/Chat2';
import Chat3 from '_components/Chat3';

import '_styles/App.less';

class App extends Component {
    render () {
        return (
            <Fragment>
                <Chat3 />
            </Fragment>
        );
    }
}

export default App;
