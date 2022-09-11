import { useState, useEffect } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        alert("error");
      })
      .finally(() => setLoading(false));
  }, []);
  const onChangeValue = (e) => {
    setSearchValue(e.target.value);
  };
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };
  const onClickSendInvites = () => {
    setSuccess(true);
  };
  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeValue={onChangeValue}
          searchValue={searchValue}
          items={users}
          isLoading={loading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}

      {/* <Success /> */}
    </div>
  );
}

export default App;
