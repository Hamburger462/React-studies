import { useState } from "react";
import "./App.css";

function App() {
    const [toDoList, setList] = useState([]);
    const [toDoText, setTDText] = useState("");
    const [likes, setLikes] = useState(0);

    const [comments, setComment] = useState([]);
    const [comment_text, setCMText] = useState("");

    const addTask = () => {
        const task = {
            id: Date.now(),
            text: toDoText,
            isLiked: false,
            isSaved: false,
            Comments: [],
        };
        setList([...toDoList, task]);
        setTDText("");
    };

    const deleteTask = (id) => {
        setList(toDoList.filter((task) => task.id != id));
    };

    const updateTask = (id) => {
        const new_text = prompt("Enter the new task text: ");

        setList(
            toDoList.map((task) =>
                task.id == id ? { ...task, text: new_text } : task
            )
        );
    };

    const addLike = (id) => {
        setLikes(likes + 1);
        setList(
            toDoList.map((task) =>
                task.id == id ? { ...task, isLiked: true } : task
            )
        );
    };
    const addDislike = (id) => {
        setLikes(likes - 1);
        setList(
            toDoList.map((task) =>
                task.id == id ? { ...task, isLiked: false } : task
            )
        );
    };

    const saveTask = (id) => {
        setList(
            toDoList.map((task) => 
                task.id == id ? { ...task, isSaved: !task.isSaved } : task
            )
        );
    };

    const addComment = (id) => {
      setComment([...comments, comment_text]);
      setList(
            toDoList.map((task) => 
                task.id == id ? { ...task, Comments: comments} : task
            )
        );
      setCMText("");
    }

    return (
        <>
            <div>
                <input
                    value={toDoText}
                    onChange={(event) => setTDText(event.target.value)}
                    placeholder="Enter the task test"
                ></input>
                <button onClick={addTask}>Create task</button>
            </div>
            <ul className="List">
                {toDoList.map((task) => (
                    <li id={task.id} key={task.id}>
                        <p>{task.text}</p>
                        <div>
                            <form>
                                <div>Likes: {likes}</div>
                                <label>
                                    <div>Like</div>
                                    <input
                                        onChange={() => addLike(task.id)}
                                        type="radio"
                                        name="likes"
                                    />
                                </label>
                                <label>
                                    <div>Dislike</div>
                                    <input
                                        onChange={() => addDislike(task.id)}
                                        type="radio"
                                        name="likes"
                                    />
                                </label>
                            </form>
                            <label>
                                Save task
                                <input
                                    type="checkbox"
                                    onChange={() => saveTask(task.id)}
                                />
                            </label>
                        </div>
                        <div>
                            <button onClick={() => updateTask(task.id)}>
                                Update task
                            </button>
                            <button onClick={() => deleteTask(task.id)}>
                                Delete task
                            </button>
                        </div>
                        <div>
                          <div>
                            Comments: 
                            <br></br>
                            {comments.map(comment => (
                              <p key={`${Date.now()}-${comment}`}>{comment}</p>
                            )
                            )}
                          </div>
                          <textarea value={comment_text} name="comment" placeholder="Write your own comment!" onChange={(event) => setCMText(event.target.value)}>
                          </textarea>
                          <button onClick={() => addComment(task.id)}>Post comment</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
