import React from 'react';

const Portfolio: React.FC = () => {
  return (
    <div>
      <section id="about">
        <h2>About Me</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <div>
          <h3>Project Alpha</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p><small>Technologies used: React, TypeScript, Node.js</small></p>
        </div>
        <div>
          <h3>Project Beta</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p><small>Technologies used: Python, Django, PostgreSQL</small></p>
        </div>
        <div>
          <h3>Project Gamma</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p><small>Technologies used: Angular, Java, Spring Boot</small></p>
        </div>
      </section>
      <section id="experience">
        <h2>Experience</h2>
        <div>
          <h3>Software Engineer at Tech Solutions Inc.</h3>
          <p>Jan 2020 - Present</p>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
          </ul>
        </div>
        <div>
          <h3>Junior Developer at Web Wizards LLC</h3>
          <p>Jun 2018 - Dec 2019</p>
          <ul>
            <li>Duis aute irure dolor in reprehenderit in voluptate velit esse.</li>
            <li>Cillum dolore eu fugiat nulla pariatur.</li>
          </ul>
        </div>
      </section>
      <section id="education">
        <h2>Education</h2>
        <div>
          <h3>B.S. in Computer Science - University of Lorem Ipsum</h3>
          <p>Graduated: May 2018</p>
        </div>
        <div>
          <h3>Web Development Bootcamp - The Coding Institute</h3>
          <p>Completed: Dec 2017</p>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
