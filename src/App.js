import { useEffect, useState } from "react";
import "./assets/Styles/Global.css";
import Container from "./components/Container";
import TableData from "./components/TableData";
import BtnAddProduct from "./components/BtnAddProduct";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ModalAdd from "./components/ModalAdd";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
});

function App() {
  const [modalState, setModalState] = useState(false);
  const [dataBd, setDataBd] = useState([]);
  const [name, setName] = useState("-");
  const [email, setEmail] = useState("-");

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  async function createUser() {
    const user = {
      name: name,
      email: email,
    };
    await addDoc(userCollectionRef, user).then((docRef) => {
      console.log(docRef);
      setModalState(false);
    });
  }

  async function deleteUser(id) {
    await deleteDoc(doc(db, "users", id));
  }
  useEffect(() => {
    async function getUser() {
      const data = await getDocs(userCollectionRef);
      setDataBd(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUser();
  }, [dataBd]);

  const tableConfig = {
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (record) => (
          <button
            className="text-red-500 font-semibold px-2 py-[2px] rounded-md"
            onClick={() => deleteUser(record.id)}
          >
            Delete
          </button>
        ),
      },
    ],
    data: dataBd,
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold underline text-center text-gray-600">
        ------ CRUD FIREBASE ------
      </h1>
      <BtnAddProduct onClick={() => setModalState(true)} />
      <ModalAdd
        state={modalState}
        setModalState={setModalState}
        onclick={createUser}
        setName={setName}
        setEmail={setEmail}
      />
      <TableData data={dataBd} tableConfig={tableConfig} />
    </Container>
  );
}

export default App;
