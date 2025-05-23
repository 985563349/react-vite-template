import { Link, Outlet } from 'react-router-dom';

const headerStyle: React.CSSProperties = {
  backgroundColor: '#f0f0f0',
  padding: '1rem',
  borderBottom: '1px solid #ccc',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  gap: '2rem',
};

const mainStyle: React.CSSProperties = {
  padding: '1rem',
};

function BasicLayout() {
  return (
    <>
      <header style={headerStyle}>
        <nav style={navStyle}>
          <ul style={ulStyle}>
            <li>
              <Link to="#about">About</Link>
            </li>
            <li>
              <Link to="#projects">Projects</Link>
            </li>
            <li>
              <Link to="#experience">Experience</Link>
            </li>
            <li>
              <Link to="#education">Education</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main style={mainStyle}>
        <Outlet />
      </main>
    </>
  );
}

export default BasicLayout;
