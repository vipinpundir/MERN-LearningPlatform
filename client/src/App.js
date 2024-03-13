import CustomNav from "./component/CustomNav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from "./routes/AllRoutes";
import './global.css'
import LocalStorageLogin from "./LocalStorageLogin";

function App() {
  
  return (
    <div className="App">
      <LocalStorageLogin/>
      <CustomNav/>
      <AllRoutes/>
      <ToastContainer position="bottom-center"/>
    </div>
  );
}

export default App;
