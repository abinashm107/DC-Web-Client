import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a className="navabartitle" href="/search">
        <h1>Directors Cut</h1>
      </a>
      <div className="links">
        <a href="/search">Search</a>
        <a href="/brb">My Bookings</a>
        <a
          href="/brb"
          className="hgtlinks"
          style={{
            fontWeight: "700",
            borderRadius: "4px",
          }}
        >
          Log Out
        </a>
      </div>
    </nav>
  );
}
 
export default Navbar;