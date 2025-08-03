import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router';
import Home from './pages/Home';
import RootLayout from './layout/RootLayout';

import "primereact/resources/themes/md-dark-deeppurple/theme.css"; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import Conversation from './pages/Conversation';
import Knowledge from './pages/Knowledge';
import Person from './pages/Person';
import Event from './pages/Event';
import Login from './pages/Login';
import Campaign from './pages/Campaign';
import Registrations from './pages/Registrations';



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path='/' element={<Home/>}/>
        <Route path='/conversation' element={<Conversation/>}/>
        <Route path='/people/:id' element={<Person/>}/>
        <Route path='/events' element={<Knowledge/>}/>
        <Route path='/events/:id' element={<Event/>}/>
        <Route path='/campaign' element={<Campaign/>}/>
        <Route path='/registrations' element={<Registrations/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
    </>
  )
);

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App
