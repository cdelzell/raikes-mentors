/*
what does this page need to do?
- have the ability for someone to sign up as a mentor
- have the ability for someone to sign up as a mentee
- have the ability to request a mentor
- have the ability to pause mentorship
- have the ability to edit profile (email, name, password)
- have the ability to see contact info of mentors/mentees
- be able to see your mentors and mentees

4 different options for a profile:
- not a mentor or mentee (Weird, not the norm)
- just a mentor
- just a mentee
- both a mentor and a mentee

Vision:
- left side navigation bar, large
- right is where the different elements will populate   
    - essentially keep the same page but load different components based on the nav state
    - or load different pages, the nav bar should be its own component
*/

import NavBar from "./components/navSideBar/navBar";

export default function Home() {
  return (
    <div>
      <NavBar />
    </div>
  );
}
