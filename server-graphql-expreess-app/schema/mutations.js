const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Song = mongoose.model("song");
const Lyric = mongoose.model("lyric");
const SongType = require("./song_type");
const LyricType = require("./lyric_type");

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addSong: {
			type: SongType,
			args: {
				title: { type: GraphQLString },
			},
			resolve(parentValue, { title }) {
				return new Song({ title }).save();
			},
		},
		addLyricToSong: {
			type: SongType,
			args: {
				content: { type: GraphQLString },
				songId: { type: GraphQLID },
			},
			resolve(parentValue, { content, songId }) {
				return Song.addLyric(songId, content);
			},
		},
		likeLyric: {
			type: LyricType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return Lyric.like(id);
			},
		},
		dislikeLyric: {
			type: LyricType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return Lyric.dislike(id);
			},
		},
		deleteSong: {
			type: SongType,
			args: { id: { type: GraphQLID } },
			resolve: async (parentValue, { id }) => {
				// 1. remove related lyrics:
				const { lyrics } = await Song.findById({ _id: id });
				await lyrics.forEach(async (lyricId) => {
					await Lyric.findByIdAndDelete({ _id: lyricId });
				});
				// 2. then remove song
				return Song.findByIdAndDelete({ _id: id });
			},
		},
		deleteLyric: {
			type: LyricType,
			args: { id: { type: GraphQLID } },
			resolve: (parentValue, args) => {
				return Lyric.findByIdAndDelete({ _id: args.id });
			},
		},
	},
});

module.exports = mutation;
