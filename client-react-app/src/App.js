import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//components:
import SongList from "./components/SongList/SongList";
import Navigation from "./components/navigation/Navigation";
import SongCreate from "./components/SongCreate/SongCreate";
import SongDetail from "./components/SongDetail/SongDetail";

//style:
import "./App.css";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache({
		dataIdFromObject: (object) => object.id,
	}),
});

const App = (props) => {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<div className="App">
					<Navigation />
					<Switch>
						<Route
							path="/"
							exact
							render={() => <h2>Homepage.</h2>}
						/>
						<Route path="/songs/new" component={SongCreate} />
						<Route path="/songs/:id" component={SongDetail} />
						<Route path="/songs" component={SongList} />
						<Route render={() => <h3>Page not found.</h3>} />
					</Switch>
				</div>
			</BrowserRouter>
		</ApolloProvider>
	);
};

export default App;
