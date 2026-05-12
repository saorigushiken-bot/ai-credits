import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { WorkflowProvider } from './context/WorkflowContext';
import ReleasesPage from './pages/ReleasesPage';
import Step1ReleaseInfo from './pages/Step1ReleaseInfo';
import TrackList from './pages/TrackList';
import Step2TrackDetails from './pages/Step2TrackDetails';
import TrackReview from './pages/TrackReview';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WorkflowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ReleasesPage />} />
            <Route path="/step1" element={<Step1ReleaseInfo />} />
            <Route path="/tracks" element={<TrackList />} />
            <Route path="/step2" element={<Step2TrackDetails />} />
            <Route path="/review" element={<TrackReview />} />
          </Routes>
        </BrowserRouter>
      </WorkflowProvider>
    </ThemeProvider>
  );
}
