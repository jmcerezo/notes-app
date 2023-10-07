import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import NewNote from "./NewNote";
import Notes from "./Notes";
import TextEditor from "./TextEditor";
import DeleteModal from "./DeleteModal";

const Home = () => {
  return (
    <>
      <ToastContainer autoClose={3000} />
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
