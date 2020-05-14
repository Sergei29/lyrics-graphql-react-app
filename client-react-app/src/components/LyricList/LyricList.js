import React, { Component } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import {
	deleteLyric,
	upVoteLyric,
	downVoteLyric,
} from "../../mutations/mutations";
import { fetchSong } from "../../queries/queries";

//style:
import "./LyricList.scss";

export class LyricList extends Component {
	onLyricDelete = (id) => {
		this.props
			.deleteLyric({
				variables: { id },
				refetchQueries: [
					{ query: fetchSong, variables: { id: this.props.songId } },
				],
			})
			.catch((e) => console.log(e));
	};

	upVoteLyric = (id) => {
		this.props
			.upVoteLyric({
				variables: { id },
				refetchQueries: [
					{ query: fetchSong, variables: { id: this.props.songId } },
				],
			})
			.catch((e) => console.log(e));
	};

	downVoteLyric = (id) => {
		this.props
			.downVoteLyric({
				variables: { id },
				refetchQueries: [
					{ query: fetchSong, variables: { id: this.props.songId } },
				],
			})
			.catch((e) => console.log(e));
	};

	render() {
		return (
			<ul className="collection">
				{this.props.lyrics
					? this.props.lyrics.map((line) => (
							<li key={line.id} className="collection-item">
								{line.content}
								<span className="likes">{line.likes}</span>
								<i
									className="material-icons small"
									title="up-vote"
									onClick={() => this.upVoteLyric(line.id)}
								>
									thumb_up
								</i>
								<i
									className="material-icons small"
									title="down-vote"
									onClick={() => this.downVoteLyric(line.id)}
								>
									thumb_down
								</i>
								<i
									className="material-icons small"
									title="delete"
									onClick={() => this.onLyricDelete(line.id)}
								>
									delete
								</i>
							</li>
					  ))
					: null}
			</ul>
		);
	}
}

export default compose(
	graphql(deleteLyric, { name: "deleteLyric" }),
	graphql(upVoteLyric, { name: "upVoteLyric" }),
	graphql(downVoteLyric, { name: "downVoteLyric" })
)(LyricList);
