import React, { useEffect, useState } from "react";
import Task from "./task.jsx";

// Where the fun starts... Lo,mismo te escribo en Spanish como en English... Toy jarta

const Home = () => {
	// Declaration of our vars
	const [dataApi, setDataApi] = useState([]);
	const [newList, setNewList] = useState("");

	//API-GET (List of objects) using fetch
	// Aqui hacemos un fecth para ver nuestras tareas, si no hay nada nos devolvera un error
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/vinobar", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setDataApi(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	//Render
	useEffect(() => {
		if (dataApi.length) {
			setNewList(
				dataApi.map((dataApi, index) => {
					return (
						<Task
							text={dataApi.label}
							id={index}
							key={index.toString()}
							delete={deleteApi}
						/>
					);
				})
			);
		}
	}, [dataApi]);

	//API-PUT using fetch
	// Aqui iremos modificando nuestra lista haciendo un PUT
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/vinobar", {
			method: "PUT",
			body: JSON.stringify(dataApi),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [dataApi]);

	//Delete function
	const deleteApi = indexDelete => {
		setDataApi(dataApi.filter((_, index) => index !== indexDelete));
	};

	//Return our To Do List, we'll see what happens.
	return (
		<div className="container text-center mt-5">
			<h1>To Do List</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}>
				<input
					id="task"
					name="task"
					className="form-control"
					type="text"
					placeholder="Write your tasks..."
					onKeyPress={e => {
						if (e.target.value != " ") {
							if (e.key === "Enter") {
								{
									setDataApi([
										...dataApi,
										{ label: e.target.value, done: false }
									]);
									e.target.value = "";
								}
							}
						}
					}}></input>
			</form>
			<div className="listBox">
				<ol>{newList}</ol>
			</div>
		</div>
	);
};

export default Home;
// Obvio va a fallarme el GitHub... como si lo viera
