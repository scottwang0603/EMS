import FooterComponent from './components/FooterComponent.jsx'
import HeaderComponent from './components/HeaderComponent.jsx'
import ListEmployeeComponent from './components/ListEmployeeComponent.jsx'
import ListDepartmentComponent from './components/ListDepartmentComponent.jsx';
import EmployeeComponent from './components/EmployeeComponent.jsx';
import DepartmentComponent from './components/DepartmentComponent.jsx';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element = {<ListEmployeeComponent />} />
          <Route path="/employees" element = {<ListEmployeeComponent />} />
          <Route path="/departments" element = {<ListDepartmentComponent />} />
          <Route path="/add-employee" element = { <EmployeeComponent />}/>
          <Route path="/edit-employee/:id" element = { <EmployeeComponent />}/>
          <Route path="/add-department" element = { <DepartmentComponent />} />
          <Route path="/edit-department/:id" element = { <DepartmentComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App;
