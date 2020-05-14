import { gql } from "apollo-boost";

const createSong = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			title
			id
		}
	}
`;

const deleteSong = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
			lyrics {
				id
			}
		}
	}
`;

const createLyric = gql`
	mutation CreateLyric($songId: ID!, $content: String) {
		addLyricToSong(songId: $songId, content: $content) {
			id
			lyrics {
				id
				content
			}
		}
	}
`;

const deleteLyric = gql`
	mutation deleteLyric($id: ID!) {
		deleteLyric(id: $id) {
			id
			content
		}
	}
`;

const upVoteLyric = gql`
	mutation upVoteLyric($id: ID!) {
		likeLyric(id: $id) {
			content
			likes
			id
		}
	}
`;

const downVoteLyric = gql`
	mutation downVoteLyric($id: ID!) {
		dislikeLyric(id: $id) {
			content
			likes
			id
		}
	}
`;

export {
	createSong,
	deleteSong,
	createLyric,
	deleteLyric,
	upVoteLyric,
	downVoteLyric,
};
