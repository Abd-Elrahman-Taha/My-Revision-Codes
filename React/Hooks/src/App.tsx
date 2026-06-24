import Review  from './components/Review'
import { createContext , useState} from 'react'
import './App.css'

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Review />
    </ThemeContext.Provider>
  );
}

export default App;
