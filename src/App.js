import { useEffect } from 'react';
import { Loader } from './components/Loader';
import { usePartyContext } from './components/contexts/PartyContext';
import { Dashboard } from './components/Dashboard';
import { useDispatch } from 'react-redux';
import { getPartyInfo } from './store/actions';

const App = () => {
  const { isLoading, fetchData, partyInfo } = usePartyContext();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
    dispatch(getPartyInfo());
  }, []);

  return (
    <div className="container">
      {isLoading && <Loader />}
      {!!partyInfo.length && !isLoading && <Dashboard />}
    </div>
  );
};

export default App;
