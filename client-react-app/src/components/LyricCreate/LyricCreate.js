import React, { Component } from "react";
import { graphql } from "react-apollo";
import { createLyric } from "../../mutations/mutations";
import { fetchSong } from "../../queries/queries";

//styles:
import "./LyricCreate.scss";

export class LyricCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lyric: "",
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onFormSubmit(event) {
		if (this.state.lyric.trim().length === 0) return;
		event.preventDefault();

		this.props
			.createLyric({
				variables: {
					songId: this.props.songId,
					content: this.state.lyric,
				},
				refetchQueries: [
					{ query: fetchSong, variables: { id: this.props.songId } },
				],
			})
			.then(() => {
				this.setState({ lyric: "" });
			})
			.catch((e) => console.log(e));
	}

	onInputChange(event) {
		this.setState({
			lyric: event.target.value,
		});
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="new-lyric">
				<label htmlFor="lyric">Lyric text: </label>
				<input
					type="text"
					name="lyric"
					value={this.state.lyric}
					onChange={this.onInputChange}
				/>
			</form>
		);
	}
}

export default graphql(createLyric, { name: "createLyric" })(LyricCreate);
