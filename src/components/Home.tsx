import NavBar from "./NavBar";
import NewNote from "./NewNote";
import Notes from "./Notes";
import TextEditor from "./TextEditor";
import DeleteModal from "./DeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <>
      <ToastContainer hideProgressBar />
      <NavBar />
      <div className="components-wrapper">
        <NewNote />
        <Notes />
        <TextEditor />
        <DeleteModal />
      </div>
    </>
  );
};

export default Home;
