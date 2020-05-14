import React from "react";
import { graphql } from "react-apollo";
import { fetchSong } from "../../queries/queries";

//components:
import LyricCreate from "../LyricCreate/LyricCreate";
import LyricList from "../LyricList/LyricList";

//style:
import "./SongDetail.scss";

const SongDetail = (props) => {
	const { song, loading } = props.data;
	let songDetails = null;
	if (loading) songDetails = <p>loading song...</p>;
	if (song) {
		songDetails = (
			<React.Fragment>
				<h3>{song.title}</h3>
				<LyricList lyrics={song.lyrics} songId={song.id} />
			</React.Fragment>
		);
	}
	return (
		<div className="container song-detail">
			{songDetails}
			<LyricCreate songId={props.match.params.id} />
		</div>
	);
};

export default graphql(fetchSong, {
	options: (props) => {
		return {
			variables: {
				id: props.match.params.id,
			},
		};
	},
})(SongDetail);
