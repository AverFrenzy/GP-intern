import { useEffect } from 'react';
import { Loader } from './components/Loader';
import { usePartyContext } from './components/contexts/PartyContext';
import { Dashboard } from './components/Dashboard';

const App = () => {
  const { isLoading, fetchData, partyInfo } = usePartyContext();

  useEffect(() => {
    fetchData();
    localStorage.clear();
  }, []);
  return (
    <div className="container">
      {isLoading && <Loader />}
      {!!partyInfo.length && !isLoading && <Dashboard />}
    </div>
  );
};

export default App;
