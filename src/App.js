import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
}




export default function App() {

  const [friends, setFriends] = useState(initialFriends)
  const [showFriend, setShowAddFriend] = useState(false);


  function handelShowAddFriend() {
    setShowAddFriend((show) => !show);
  }


  function handelAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
  }



  return <div className="app">
    <div className="sidebar">
      <FriendList friends={friends} />
      {showFriend && <FormFriend onAddFriend={handelAddFriend} />}
      <Button onClick={handelShowAddFriend}>{showFriend ? "close" : "Add Friend"}</Button>
    </div>
    <FormSplitBill />
  </div>
}

function FriendList({ friends }) {

  return <ul>
    {
      friends.map(friend => <Friend friend={friend} key={friend.id} />)
    }
  </ul>
}

function Friend({ friend }) {
  return <li>
    <img src={friend.image} alt={friend.image} />
    <h3>{friend.name}</h3>

    {friend.balance < 0 && <p className="red">You own ${friend.name} {Math.abs(friend.balance)}$</p>}

    {friend.balance > 0 && <p className="green">{friend.name} owes you{Math.abs(friend.balance)}$</p>}

    {friend.balance === 0 && <p>You age {friend.name} are even</p>}

    <Button>Select</Button>

  </li>
}




function FormFriend({ onAddFriend }) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=118836");


  function handelSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?u=118836");
  }


  return <form className="form-add-friend" onSubmit={handelSubmit}>
    <label>🚻Friend Name</label>
    <input type="text" value={name}
      onChange={(e) => setName(e.target.value)} />
    <input type="text" />

    <label type='text' value={image}
      onChange={(e) => setImage(e.target.value)}>☯Image URL</label>
    <input type="text" />

    <Button>Add</Button>
  </form>
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Spilt a bill with X</h2>

      <label>Bill Value</label>
      <input type="text" />

      <label>Your Expense</label>
      <input type="text" />

      <label>X's Expense</label>
      <input type="text" disabled />

      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Spilt Bill</Button>
    </form>
  )
}