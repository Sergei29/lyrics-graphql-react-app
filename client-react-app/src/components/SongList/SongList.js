import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import { fetchAllSongs } from "../../queries/queries";
import { deleteSong } from "../../mutations/mutations";

//styles:
import "./SongList.scss";

class SongList extends Component {
	onSongDelete = (id) => {
		this.props
			.deleteSong({
				variables: {
					id,
				},
			})
			.then(() => {
				this.props.fetchAllSongs.refetch();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		if (this.props.fetchAllSongs.loading) return <div>Loading...</div>;
		const songs = this.props.fetchAllSongs.songs
			? this.props.fetchAllSongs.songs.map(({ id, title }) => (
					<li key={id} className="collection-item">
						<Link to={`/songs/${id}`}>{title}</Link>
						<i
							className="material-icons small"
							title="delete"
							onClick={() => this.onSongDelete(id)}
						>
							delete
						</i>
					</li>
			  ))
			: null;
		return (
			<div className="container">
				<h2>Song list</h2>
				<ul className="collection">{songs}</ul>
				<Link
					to="songs/new"
					className="btn-floating btn-large red right"
				>
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

export default compose(
	graphql(fetchAllSongs, { name: "fetchAllSongs" }),
	graphql(deleteSong, { name: "deleteSong" })
)(SongList);
