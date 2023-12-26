import { AppRouter } from './components/router/AppRouter';
import { ThemeContextProvider } from './contexts/ThemeContext';
import './App.css';

export default function App() {
  return (
    <ThemeContextProvider>
      <AppRouter />
    </ThemeContextProvider>
  );
}
