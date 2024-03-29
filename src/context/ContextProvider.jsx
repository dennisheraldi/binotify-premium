import {createContext} from 'preact'
import {useContext,useReducer,useRef} from 'preact/hooks';

    const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_ALERT':
        return { ...state, alert: action.payload };
      case 'START_LOADING':
        return { ...state, loading: true };
      case 'STOP_LOADING':
        return { ...state, loading: false };
      default:
        throw new Error('No matched action!');
    }
  };

  const initialState = {
    users: [],
    alert: { open: false, severity: 'info', message: '' },
    loading: false,
  };
  
  const Context = createContext(initialState);
  
  export const useValue = () => {
    return useContext(Context);
  };
  
  const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const mapRef = useRef();
    const containerRef = useRef();
    return (
      <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
        {children}
      </Context.Provider>
    );
  };
  
  export default ContextProvider;