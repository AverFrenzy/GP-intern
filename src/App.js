import React, { useEffect } from 'react';
import { Loader } from './components';
import { usePartyContext } from './components/contexts/PartyContext';
import Dashboard from './components/Dashboard/Dashboard';
import { TableFeedback } from './components/TableFeedback';
import { PercentWidget } from './components/PercentWidget';


const App = () => {
  const { isLoading, fetchData, partyInfo } = usePartyContext();

  useEffect(() => {
    fetchData()
  },[])
  return (
    <div className='container'>
      {isLoading && <Loader/>}
      { (!!partyInfo.length && !isLoading) && <Dashboard /> }
      { (!!partyInfo.length && !isLoading) && <TableFeedback /> }
      { (!!partyInfo.length && !isLoading) && <PercentWidget value={65}/> }
    </div>
  );
};

export default App;
