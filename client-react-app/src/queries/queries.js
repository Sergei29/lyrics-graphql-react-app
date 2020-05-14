import { gql } from "apollo-boost";

const fetchSong = gql`
	query SongQuery($id: ID!) {
		song(id: $id) {
			id
			title
			lyrics {
				content
				id
				likes
			}
		}
	}
`;

const fetchAllSongs = gql`
	query {
		songs {
			title
			id
		}
	}
`;

export { fetchSong, fetchAllSongs };
