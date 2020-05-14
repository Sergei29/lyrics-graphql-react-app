import React, { Component } from "react";
import { graphql } from "react-apollo";
import { fetchAllSongs } from "../../queries/queries";
import { createSong } from "../../mutations/mutations";

class SongCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
		};
		this.titleChangeHandler = this.titleChangeHandler.bind(this);
		this.formSubmitHandler = this.formSubmitHandler.bind(this);
	}

	titleChangeHandler(event) {
		this.setState({ title: event.target.value });
	}

	formSubmitHandler(event) {
		if (this.state.title.trim().length === 0) return;
		event.preventDefault();

		this.props
			.mutate({
				variables: {
					title: this.state.title,
				},
				refetchQueries: [{ query: fetchAllSongs }],
			})
			.then((res) => {
				this.props.history.push("/songs");
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="container">
				<h3>Create New Song</h3>
				<form onSubmit={this.formSubmitHandler}>
					<label htmlFor="title">Song title:</label>
					<input
						type="text"
						name="title"
						onChange={this.titleChangeHandler}
						value={this.state.title}
					/>
				</form>
			</div>
		);
	}
}

export default graphql(createSong)(SongCreate);
