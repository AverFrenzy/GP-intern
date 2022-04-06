import React from 'react';

import { Table, Loader, Pizza } from './components';
import { usePartyContext } from './components/contexts/PartyContext';


const App = () => {
  const { isLoading, fetchData, partyInfo } = usePartyContext();

  return (
    <div className='container'>
      <button onClick={ fetchData } className='load-button' disabled={ isLoading }>
        { isLoading ? <Loader /> : 'Load' }
      </button>
      { (!!partyInfo.length && !isLoading) && <Pizza /> }
      { (!!partyInfo.length && !isLoading) && <Table /> }
    </div>
  );
};

export default App;
