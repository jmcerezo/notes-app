import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import NewNote from "./NewNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <NavBar />
      <div className="components-wrapper">
        <NewNote />
        <Notes />
      </div>
    </>
  );
};

export default Home;
