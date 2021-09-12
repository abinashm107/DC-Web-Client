import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Search from './components/Search';
import Navbar from './components/Navbar';
import BookingPage from "./components/BookingPage";
import ComingSoon from "./components/ComingSoon";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/search" component={Search} />
          <Route exact path="/book/:mov_id" children={<BookingPage />} />
          <Route exact path="/brb" component={ComingSoon} />
          <Route path="*" component={Search} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
