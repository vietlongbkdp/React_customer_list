import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import LeftNav from "./component/LeftNav/LeftNav";
library.add(fab, faCartPlus )

function App() {
  return (
      <>
          <LeftNav/>
      </>
  );
}

export default App;
