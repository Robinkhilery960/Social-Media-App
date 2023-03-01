import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataApi } from "../../utils/fetchData";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataApi(`search?userName=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.message } });
    }
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
         
        }
        title="Enter to Search"
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }} >
        <span className="material-icons">search</span>
        <span>Enter to Search</span>
      </div>
      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 0.1 }}
      >
        &times;
      </div>
      <button type="submit" style={{ display: " none" }} >
        Search
      </button>

      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              user={user}
              key={user._id}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
}

export default Search;
